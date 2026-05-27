import { useEffect, useState } from 'react';
import { Search, IndianRupee, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { get, patch, del } from '../utils/api';
import Spinner from '../components/Spinner';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await get('/donations');
      const data = res.data.donations || res.data;
      setDonations(Array.isArray(data) ? data : []);
    } catch {
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVerify = async (id, currentStatus) => {
    try {
      await patch(`/donations/${id}/verify`, {});
      setDonations((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isVerified: !currentStatus } : d))
      );
    } catch {
      alert('Failed to update status');
    }
  };

  const deleteDonation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await del(`/donations/${id}`);
      setDonations((prev) => prev.filter((d) => d.id !== id));
    } catch {
      alert('Failed to delete record');
    }
  };

  const filtered = donations.filter(
    (d) =>
      d.donorName?.toLowerCase().includes(search.toLowerCase()) ||
      d.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      d.email?.toLowerCase().includes(search.toLowerCase()) ||
      d.phone?.includes(search)
  );

  const totalAmount = donations.reduce((sum, d) => d.isVerified ? sum + Number(d.amount || 0) : sum, 0);

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-dark-900">Donations & Payments</h2>
          <p className="text-gray-500 text-sm">
            {donations.length} total records • ₹{totalAmount.toLocaleString('en-IN')} verified
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, txn ID, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100">
          <IndianRupee className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>{search ? 'No records match your search' : 'No donations reported yet'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Donor Details</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Transaction Info</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium text-dark-900">{d.donorName}</div>
                      <div className="text-xs text-gray-500 mt-1">{d.phone}</div>
                      {d.email && <div className="text-xs text-gray-500">{d.email}</div>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-mono text-xs font-semibold text-gray-600">{d.transactionId}</div>
                      <div className="text-xs text-gray-500 mt-1">{d.paymentDate}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-dark-900">₹{Number(d.amount).toLocaleString('en-IN')}</div>
                    </td>
                    <td className="px-4 py-4">
                      {d.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                          <Clock className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <button
                        onClick={() => toggleVerify(d.id, d.isVerified)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          d.isVerified
                            ? 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                            : 'text-white bg-primary-600 hover:bg-primary-700'
                        }`}
                      >
                        {d.isVerified ? 'Unverify' : 'Verify'}
                      </button>
                      <button
                        onClick={() => deleteDonation(d.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
