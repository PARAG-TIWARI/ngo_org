import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Facebook, Instagram, Linkedin } from './SocialIcons';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Activities', path: '/activities' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Donate', path: '/donate' },
  { name: 'Contact', path: '/contact' },
];

const programs = [
  { name: 'Education Awareness', path: '/programs' },
  { name: 'Environmental Protection', path: '/programs' },
  { name: 'Water Conservation', path: '/programs' },
  { name: 'Health & Nutrition', path: '/programs' },
  { name: 'Rural Development', path: '/programs' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-300 relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-accent-400" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="MDJKS Logo" className="w-32 h-24 object-contain" />
              <div>
                <h3 className="font-heading font-bold text-white text-sm">Maharshi Dayanand</h3>
                <p className="text-primary-400 text-xs">Jan Kalyan Sanstha</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Dedicated to empowering citizens through education awareness, environmental
              protection, water conservation, health & nutrition, and rural development
              across India.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="https://wa.me/+91 9630626091"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.352 0-4.556-.753-6.347-2.064l-.443-.332-3.1 1.04 1.04-3.1-.332-.443A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Our Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((prog) => (
                <li key={prog.name}>
                  <Link
                    to={prog.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {prog.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-gray-400">
                  <p className="leading-tight"><strong className="text-gray-300">Registered:</strong> Maharishi Dayanand Public Welfare Organization, Bhopal J-351, Kotra Sultanabad Road</p>
                  <p className="leading-tight"><strong className="text-gray-300">Temporary:</strong> H NO. 114 HARI NAGAR NEELBAD BHOPAL -462044</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                <a href="tel:+91 96306 26091" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +91 96306 26091
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                <a href="Maharshisanstha35@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Maharshisanstha35@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Maharshi Dayanand Jan Kalyan Sanstha. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 mx-1" fill="currentColor" /> for a better India
          </div>
        </div>
      </div>
    </footer>
  );
}
