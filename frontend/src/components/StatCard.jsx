import { useEffect, useRef, useState } from 'react';

export default function StatCard({ icon: Icon, number, label, suffix = '+' }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = number;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, number]);

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-6 md:p-8 text-center hover-lift transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}
