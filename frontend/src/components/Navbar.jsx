import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronRight, User } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Annual Report', path: '/annual-report' },
  { name: 'Members', path: '/members' },
  { name: 'Certificates', path: '/certifications' },
  { name: 'Programs', path: '/programs' },
  { name: 'Activities', path: '/activities' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-white/85 backdrop-blur-xl border-b border-zinc-100/80 shadow-sm py-2"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="MDJKS Logo" className="w-16 h-16 object-contain" />
              <div className="hidden xl:block">
                <h1 className="font-heading font-bold text-sm leading-tight text-dark-900">
                  Maharshi Dayanand
                </h1>
                <p className="text-xs text-primary-600">
                  Jan Kalyan Sanstha
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-2 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary-500" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Items */}
            <div className="flex items-center gap-3">
              <Link to="/admin/login" className="text-gray-400 hover:text-primary-600 transition-colors hidden md:block" title="Admin Login">
                <User className="w-5 h-5" />
              </Link>
              <Link
                to="/donate"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-semibold shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:scale-105 transition-all duration-300"
              >
                <Heart className="w-4 h-4" />
                Donate
              </Link>
              <button
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6 text-dark-900" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-fadeInRight">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="MDJKS Logo" className="w-16 h-16 object-contain" />
                  <div>
                    <h2 className="font-heading font-bold text-xs text-dark-900">Maharshi Dayanand</h2>
                    <p className="text-[10px] text-primary-600">Jan Kalyan Sanstha</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
              </div>

              {/* Donate and Admin Mobile */}
              <div className="mt-8 space-y-3">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold"
                >
                  <User className="w-4 h-4" />
                  Admin Login
                </Link>
                <Link
                  to="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold shadow-lg shadow-accent-500/25"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
