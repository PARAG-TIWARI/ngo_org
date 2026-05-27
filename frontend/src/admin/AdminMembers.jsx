import { useState, useEffect } from 'react';
import { get, post, put, del } from '../utils/api';
import { Plus, Trash2, Edit, X, Upload } from 'lucide-react';

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', designation: '', profession: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await get('/members');
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('designation', formData.designation);
      data.append('profession', formData.profession || '');
      
      if (imageFile) {
        data.append('image', imageFile);
      } else {
        data.append('imageUrl', formData.imageUrl || '');
      }

      if (editingId) {
        await put(`/members/${editingId}`, data);
      } else {
        await post('/members', data);
      }

      handleCancel();
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || err.response?.data?.message || 'Error saving member');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await del(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || err.response?.data?.message || 'Error deleting member');
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      designation: member.designation,
      profession: member.profession || '',
      imageUrl: member.imageUrl || '',
    });
    setEditingId(member.id);
    setImageFile(null);
    setImagePreview(
      member.imageUrl
        ? member.imageUrl.startsWith('http')
          ? member.imageUrl
          : `http://localhost:5000${member.imageUrl}`
        : ''
    );
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', designation: '', profession: '', imageUrl: '' });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-dark-900 mb-4">{editingId ? 'Edit Member' : 'Add New Member'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input
              type="text"
              required
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
            <input
              type="text"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="e.g. Doctor, Teacher, Businessman"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span>Upload Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <span className="text-xs text-green-600 font-medium truncate max-w-[200px]">
                    Selected: {imageFile.name}
                  </span>
                )}
              </div>
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider">or</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => {
                  setFormData({ ...formData, imageUrl: e.target.value });
                  setImagePreview(e.target.value);
                  setImageFile(null); // Clear uploaded file if URL is typed
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Or paste image URL: https://example.com/image.jpg"
              />
              {imagePreview && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="shrink-0">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                      setFormData({ ...formData, imageUrl: '' });
                    }}
                    className="p-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {editingId ? 'Update Member' : 'Add Member'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Photo</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Designation</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Profession</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No members found</td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    {member.imageUrl ? (
                      <img src={member.imageUrl?.startsWith('http') ? member.imageUrl : `http://localhost:5000${member.imageUrl}`} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-dark-900">{member.name}</td>
                  <td className="px-6 py-4 text-gray-600">{member.designation}</td>
                  <td className="px-6 py-4 text-gray-500">{member.profession || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
