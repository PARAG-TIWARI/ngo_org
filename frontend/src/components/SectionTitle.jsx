import { useEffect, useRef, useState } from 'react';

export default function SectionTitle({ title, subtitle, light = false, center = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 ${center ? 'text-center' : ''} transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-dark-900'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary-500 to-accent-400 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}
