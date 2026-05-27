import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Image, CalendarDays, Users, MessageSquare,
  LogOut, Menu, X, Heart, ChevronRight, IndianRupee
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Gallery', path: '/admin/gallery', icon: Image },
  { name: 'Activities', path: '/admin/activities', icon: CalendarDays },
  { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
  { name: 'Members', path: '/admin/members', icon: Users },
  { name: 'Certificates', path: '/admin/certificates', icon: Image },
  { name: 'Contacts', path: '/admin/contacts', icon: MessageSquare },
  { name: 'Donations', path: '/admin/donations', icon: IndianRupee },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MDJKS Logo" className="w-12 h-12 object-contain bg-white rounded-lg p-0.5" />
          <div>
            <h2 className="font-heading font-bold text-white text-sm">MDJKS</h2>
            <p className="text-primary-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive(link.path)
                ? 'bg-primary-600/20 text-primary-400'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <link.icon className="w-5 h-5" />
            {link.name}
            {isActive(link.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-dark-900 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-dark-900 flex flex-col animate-fadeInLeft">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="font-heading font-semibold text-dark-900">
              {sidebarLinks.find((l) => isActive(l.path))?.name || 'Admin Panel'}
            </h1>
          </div>
          <Link
            to="/"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View Site →
          </Link>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
