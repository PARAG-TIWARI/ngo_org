import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, ArrowRight, GraduationCap, TreePine, Droplets,
  Stethoscope, Building2, School, Users, Megaphone, Leaf,
  ShieldCheck, Check,
} from 'lucide-react';
import { get } from '../utils/api';
import SectionTitle from '../components/SectionTitle';
import StatCard from '../components/StatCard';
import ProgramCard from '../components/ProgramCard';
import ActivityCard from '../components/ActivityCard';
import TestimonialCard from '../components/TestimonialCard';

const stats = [
  { icon: School, number: 50, label: 'Schools Connected', suffix: '+' },
  { icon: Megaphone, number: 100, label: 'Awareness Programs', suffix: '+' },
  { icon: Users, number: 5000, label: 'Lives Impacted', suffix: '+' },
  { icon: Leaf, number: 25, label: 'Environmental Campaigns', suffix: '+' },
];

const programs = [
  {
    icon: GraduationCap,
    title: 'Education Awareness',
    description:
      'Promoting quality education through school enrollment drives, literacy campaigns, and scholarship programs for underprivileged children across rural India.',
  },
  {
    icon: TreePine,
    title: 'Environmental Protection',
    description:
      'Leading tree plantation drives, waste management initiatives, and awareness campaigns to preserve our natural heritage for future generations.',
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    description:
      'Implementing rainwater harvesting, restoring water bodies, and educating communities about sustainable water usage and management practices.',
  },
  {
    icon: Stethoscope,
    title: 'Health & Nutrition',
    description:
      'Organizing free health camps, nutrition awareness programs, and maternal health workshops in underserved communities across Madhya Pradesh.',
  },
  {
    icon: Building2,
    title: 'Rural Development',
    description:
      'Empowering rural communities through skill development, infrastructure support, sanitation drives, and sustainable livelihood programs.',
  },
];

const testimonials = [
  {
    quote:
      'Thanks to the education program, my daughter is the first in our family to attend school. The volunteers helped us understand the importance of girls\' education and supported us throughout the admission process.',
    author: 'Ramesh Kumar',
    role: 'Parent, Varanasi District',
  },
  {
    quote:
      'The water conservation workshop changed how our entire village thinks about water. We built check dams and started rainwater harvesting. Our wells no longer dry up in summer.',
    author: 'Sunita Devi',
    role: 'Village Sarpanch, Rural UP',
  },
  {
    quote:
      'The free health camp identified my mother\'s diabetes early. The NGO connected us with a government hospital for treatment. Their follow-up care has been exceptional.',
    author: 'Priya Sharma',
    role: 'Community Member, Prayagraj',
  },
];

const fallbackActivities = [
  {
    _id: '1',
    title: 'Annual Tree Plantation Drive 2025',
    description:
      'Over 500 saplings were planted along the riverbank with participation from local school students and community members.',
    date: '2025-07-15',
    location: 'Varanasi, UP',
  },
  {
    _id: '2',
    title: 'Girls Education Awareness Rally',
    description:
      'A city-wide awareness rally promoting girls\' education with participation from over 1,000 students and parents.',
    date: '2025-09-08',
    location: 'Prayagraj, UP',
  },
  {
    _id: '3',
    title: 'Free Health Camp — World Health Day',
    description:
      'Free medical check-ups including eye tests, blood sugar screening, and dental examination for rural communities.',
    date: '2025-04-07',
    location: 'Mirzapur, UP',
  },
];

const fallbackHeroImages = [
  { src: '/hero_children_studying.png', alt: 'Children studying' },
  { src: '/volunteer_tree_planting.png', alt: 'Volunteers planting trees' },
  { src: '/village_health_camp.png', alt: 'Village health camp check-up' }
];

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [heroImages, setHeroImages] = useState(fallbackHeroImages);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await get('/activities');
        const data = res.data.activities || res.data;
        setActivities(Array.isArray(data) ? data.slice(0, 3) : fallbackActivities);
      } catch {
        setActivities(fallbackActivities);
      }

      try {
        const galleryRes = await get('/gallery?category=HERO');
        if (galleryRes.data && galleryRes.data.length > 0) {
          setHeroImages(galleryRes.data.map(item => ({
            src: item.imageUrl?.startsWith('http') ? item.imageUrl : `https://ngo-org.onrender.com${item.imageUrl}`,
            alt: item.caption || 'Hero Image'
          })));
        }
      } catch (err) {
        console.error('Failed to fetch hero images', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f2] via-[#f3ede0] to-[#fbf9f6] border-b border-[#e4dfd5]" />
        <div className="absolute inset-0 hero-pattern" />
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50/80 backdrop-blur-sm border border-accent-200/50 text-accent-700 text-sm mb-8 animate-fadeInUp">
                <Heart className="w-4 h-4 text-accent-500" fill="currentColor" />
                Empowering Citizens, Educating Children
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#18181b] mb-6 animate-fadeInUp delay-100 leading-tight">
                Maharshi Dayanand{' '}
                <span className="gradient-text">Jan Kalyan</span>{' '}
                Sanstha
              </h1>

              <p className="text-base md:text-lg text-[#52525b] max-w-2xl mx-auto lg:mx-0 mb-10 animate-fadeInUp delay-200 leading-relaxed">
                Building a better future through education awareness, environmental protection,
                water conservation, health & nutrition, and rural development across India.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fadeInUp delay-300">
                <Link
                  to="/donate"
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold shadow-xl shadow-accent-500/25 hover:shadow-accent-500/40 hover:scale-105 transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                  Donate Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-200 text-[#27272a] font-semibold hover:bg-primary-50/50 hover:border-primary-300 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Media (Slideshow) */}
            <div className="lg:col-span-5 relative flex justify-center animate-scaleIn delay-200">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-15 blur-lg animate-pulse-glow" />
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/60 bg-white">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-accent-500 w-6' : 'bg-primary-300 hover:bg-primary-400'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <div className="w-6 h-10 rounded-full border-2 border-primary-300 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-primary-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-20 lg:py-28 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Who We Are"
                subtitle="A dedicated team working towards a brighter, more equitable India"
                center={false}
              />
              <p className="text-gray-600 leading-relaxed mb-4">
                Maharshi Dayanand Jan Kalyan Sanstha is a registered non-profit organization
                committed to transforming the lives of underprivileged communities across
                Madhya Pradesh and beyond. Founded on the principles of Swami Dayanand
                Saraswati, we believe in education as the greatest tool for social change.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our grassroots approach ensures that every initiative — from school enrollment
                drives to environmental conservation projects — is community-led and
                sustainable. We work hand-in-hand with villages, schools, and local bodies to
                create lasting impact.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 group"
              >
                Read more about us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 aspect-[4/3] relative group">
                <img
                  src="/volunteer_tree_planting.png"
                  alt="Volunteers planting trees in India"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="font-heading text-2xl font-bold mb-1">
                    Since 2015
                  </p>
                  <p className="text-white/80 text-sm">
                    Serving communities across Madhya Pradesh
                  </p>
                </div>
              </div>
              {/* Decorative card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float z-20 border border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-dark-900">5000+</p>
                    <p className="text-xs text-gray-500">Lives Impacted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            title="Our Impact in Numbers"
            subtitle="Measurable change through dedicated community service"
            light
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="py-20 lg:py-28 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Programs"
            subtitle="Comprehensive initiatives driving sustainable change across multiple dimensions"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, idx) => (
              <ProgramCard key={idx} {...prog} delay={idx * 100} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-200 text-primary-600 font-semibold hover:bg-primary-50 transition-all group"
            >
              View All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ACTIVITIES ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Recent Activities"
            subtitle="Stay updated with our latest events and community programs"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, idx) => (
              <ActivityCard key={activity._id || idx} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-200 text-primary-600 font-semibold hover:bg-primary-50 transition-all group"
            >
              View All Activities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="py-20 lg:py-28 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Gallery"
            subtitle="Moments captured from our events and community initiatives"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { img: '/volunteer_tree_planting.png', label: 'Tree Plantation' },
              { img: '/village_health_camp.png', label: 'Health Camp' },
              { img: '/hero_children_studying.png', label: 'Education Drive' },
              { img: '/volunteer_tree_planting.png', label: 'Water Conservation' },
              { img: '/village_health_camp.png', label: 'Community Service' },
              { img: '/hero_children_studying.png', label: 'Nutrition Support' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden aspect-square group hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md border border-white/20"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="font-heading font-semibold text-white text-base md:text-lg drop-shadow-sm">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary-200 text-primary-600 font-semibold hover:bg-primary-50 transition-all group"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Voices from the Community"
            subtitle="Hear from the people whose lives have been touched by our initiatives"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} {...t} delay={idx * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Your support can change lives. Help us build a better future for underprivileged
            children and communities across India.
          </p>
          <div className="flex justify-center">
            <Link
              to="/donate"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-5 h-5 text-accent-500" fill="currentColor" />
              Support with Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
