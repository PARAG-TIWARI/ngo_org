import { useEffect, useState } from 'react';
import { Search, MessageSquare, Mail, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { get, patch } from '../utils/api';
import Spinner from '../components/Spinner';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await get('/contacts');
        const data = res.data.contacts || res.data;
        setContacts(Array.isArray(data) ? data : []);
      } catch {
        setContacts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleRead = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'read' ? 'unread' : 'read';
      await patch(`/contacts/${id}`, { status: newStatus });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch {
      // silently fail
    }
  };

  const filtered = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.message?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-dark-900">Contact Messages</h2>
          <p className="text-gray-500 text-sm">
            {contacts.length} total messages
            {contacts.filter((c) => c.status !== 'read').length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-accent-100 text-accent-600 font-medium">
                {contacts.filter((c) => c.status !== 'read').length} unread
              </span>
            )}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>{search ? 'No messages match your search' : 'No contact messages yet'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600 w-8"></th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Message</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((msg) => (
                  <>
                    <tr
                      key={msg._id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${msg.status !== 'read' ? 'bg-primary-50/30' : ''}`}
                      onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)}
                    >
                      <td className="px-4 py-3">
                        {expandedId === msg._id ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-dark-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {msg.status !== 'read' && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                          {msg.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {msg.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-[300px] truncate hidden md:table-cell">
                        {msg.message}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap hidden sm:table-cell">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRead(msg._id, msg.status);
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            msg.status === 'read'
                              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                          }`}
                        >
                          {msg.status === 'read' ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                              Read
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              Unread
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3" />
                    </tr>
                    {expandedId === msg._id && (
                      <tr key={`${msg._id}-expanded`} className="bg-gray-50/50">
                        <td colSpan={7} className="px-8 py-4">
                          <div className="max-w-2xl">
                            <p className="text-xs text-gray-500 mb-1">Full Message:</p>
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                              {msg.message}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
