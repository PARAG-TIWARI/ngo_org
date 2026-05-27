import { useEffect, useState } from 'react';
import { Image, CalendarDays, Users, MessageSquare, Clock, Mail } from 'lucide-react';
import { get } from '../utils/api';
import Spinner from '../components/Spinner';

export default function Dashboard() {
  const [stats, setStats] = useState({ gallery: 0, activities: 0, volunteers: 0, contacts: 0 });
  const [recentVolunteers, setRecentVolunteers] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [galRes, actRes, volRes, conRes] = await Promise.allSettled([
          get('/gallery'),
          get('/activities'),
          get('/volunteers'),
          get('/contacts'),
        ]);

        const galData = galRes.status === 'fulfilled' ? (galRes.value.data.images || galRes.value.data) : [];
        const actData = actRes.status === 'fulfilled' ? (actRes.value.data.activities || actRes.value.data) : [];
        const volData = volRes.status === 'fulfilled' ? (volRes.value.data.volunteers || volRes.value.data) : [];
        const conData = conRes.status === 'fulfilled' ? (conRes.value.data.contacts || conRes.value.data) : [];

        setStats({
          gallery: Array.isArray(galData) ? galData.length : 0,
          activities: Array.isArray(actData) ? actData.length : 0,
          volunteers: Array.isArray(volData) ? volData.length : 0,
          contacts: Array.isArray(conData) ? conData.length : 0,
        });

        setRecentVolunteers(Array.isArray(volData) ? volData.slice(0, 5) : []);
        setRecentContacts(Array.isArray(conData) ? conData.slice(0, 5) : []);
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Spinner size="lg" className="py-20" />;

  const statCards = [
    { icon: Image, label: 'Gallery Images', value: stats.gallery, color: 'from-blue-500 to-blue-600' },
    { icon: CalendarDays, label: 'Activities', value: stats.activities, color: 'from-green-500 to-green-600' },
    { icon: Users, label: 'Volunteers', value: stats.volunteers, color: 'from-purple-500 to-purple-600' },
    { icon: MessageSquare, label: 'Messages', value: stats.contacts, color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-dark-900 mb-1">Welcome back!</h2>
        <p className="text-gray-500 text-sm">Here is an overview of your NGO management panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-heading text-3xl font-bold text-dark-900">{card.value}</p>
            <p className="text-gray-500 text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Data */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Volunteers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-semibold text-dark-900">Recent Volunteers</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="divide-y divide-gray-50">
            {recentVolunteers.length === 0 ? (
              <p className="p-5 text-gray-500 text-sm text-center">No volunteer submissions yet</p>
            ) : (
              recentVolunteers.map((vol, idx) => (
                <div key={idx} className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {vol.name?.charAt(0)?.toUpperCase() || 'V'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark-900 truncate">{vol.name}</p>
                    <p className="text-xs text-gray-500 truncate">{vol.email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                    <Clock className="w-3 h-3" />
                    {vol.createdAt ? new Date(vol.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'N/A'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-semibold text-dark-900">Recent Messages</h3>
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
          <div className="divide-y divide-gray-50">
            {recentContacts.length === 0 ? (
              <p className="p-5 text-gray-500 text-sm text-center">No messages yet</p>
            ) : (
              recentContacts.map((msg, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-dark-900">{msg.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'N/A'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
