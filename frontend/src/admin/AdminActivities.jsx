import { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, X, Calendar, MapPin } from 'lucide-react';
import { get, post, put, del } from '../utils/api';
import Spinner from '../components/Spinner';

const emptyForm = { title: '', description: '', date: '', location: '', image: null, extraImages: [] };

export default function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fetchActivities = async () => {
    try {
      const res = await get('/activities');
      const data = res.data.activities || res.data;
      setActivities(Array.isArray(data) ? data : []);
    } catch {
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchActivities(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (activity) => {
    setEditing(activity._id);
    setForm({
      title: activity.title || '',
      description: activity.description || '',
      date: activity.date ? activity.date.split('T')[0] : '',
      location: activity.location || '',
      image: null,
      extraImages: [],
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      if (form.date) formData.append('date', form.date);
      if (form.location) formData.append('location', form.location);
      if (form.image) formData.append('image', form.image);
      if (form.extraImages && form.extraImages.length > 0) {
        form.extraImages.forEach(img => {
          formData.append('extraImages', img.file);
          formData.append('captions', img.caption);
        });
      }

      if (editing) {
        await put(`/activities/${editing}`, formData);
      } else {
        await post('/activities', formData);
      }
      setModalOpen(false);
      await fetchActivities();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await del(`/activities/${deleteId}`);
      setActivities((prev) => prev.filter((a) => a._id !== deleteId));
    } catch {
      setError('Failed to delete activity');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-dark-900">Activities</h2>
          <p className="text-gray-500 text-sm">{activities.length} total activities</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Activity
        </button>
      </div>

      {/* Activities List */}
      {activities.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No activities yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity) => {
            const imgSrc = activity.image
              ? (activity.image.startsWith('http') ? activity.image : `http://localhost:5000${activity.image}`)
              : null;
            return (
              <div key={activity._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 relative">
                  {imgSrc ? (
                    <img src={imgSrc} alt={activity.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-primary-300 text-4xl font-heading font-bold">
                      {activity.title?.charAt(0) || 'A'}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-semibold text-dark-900 mb-1 text-sm line-clamp-1">{activity.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    {activity.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(activity.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    {activity.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs line-clamp-2 mb-3">{activity.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(activity)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(activity._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-bold text-dark-900">
                {editing ? 'Edit Activity' : 'Create Activity'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  placeholder="Activity title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm resize-none"
                  placeholder="Activity description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                    placeholder="e.g., Varanasi, UP"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newExtraImages = files.map(file => ({
                      file,
                      caption: '',
                      preview: URL.createObjectURL(file)
                    }));
                    setForm({ ...form, extraImages: newExtraImages });
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100 cursor-pointer"
                />
                {editing && <p className="text-xs text-gray-500 mt-1">Uploading new additional images will replace all existing ones.</p>}
                
                {form.extraImages && form.extraImages.length > 0 && (
                  <div className="mt-4 space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                    {form.extraImages.map((img, idx) => (
                      <div key={idx} className="flex gap-3 items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <img src={img.preview} alt={`Preview ${idx}`} className="w-16 h-16 object-cover rounded-md" />
                        <input
                          type="text"
                          placeholder="Image caption (optional)"
                          value={img.caption}
                          onChange={(e) => {
                            const newExtra = [...form.extraImages];
                            newExtra[idx].caption = e.target.value;
                            setForm({ ...form, extraImages: newExtra });
                          }}
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editing ? 'Update' : 'Create'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scaleIn">
            <h3 className="font-heading text-lg font-bold text-dark-900 mb-2">Delete Activity?</h3>
            <p className="text-gray-600 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
