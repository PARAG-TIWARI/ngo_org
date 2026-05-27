import { useEffect, useState } from 'react';
import { Search, Users } from 'lucide-react';
import { get } from '../utils/api';
import Spinner from '../components/Spinner';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await get('/volunteers');
        const data = res.data.volunteers || res.data;
        setVolunteers(Array.isArray(data) ? data : []);
      } catch {
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = volunteers.filter(
    (v) =>
      v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase()) ||
      v.phone?.includes(search) ||
      v.areaOfInterest?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-dark-900">Volunteers</h2>
          <p className="text-gray-500 text-sm">{volunteers.length} total registrations</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search volunteers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>{search ? 'No volunteers match your search' : 'No volunteer submissions yet'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Skills</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Availability</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Area</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((vol, idx) => (
                  <tr key={vol._id || idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-dark-900 whitespace-nowrap">{vol.name}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{vol.email}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{vol.phone}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate hidden lg:table-cell">{vol.skills || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                        {vol.availability || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-600 capitalize">
                        {vol.areaOfInterest || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap hidden md:table-cell">
                      {vol.createdAt
                        ? new Date(vol.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
