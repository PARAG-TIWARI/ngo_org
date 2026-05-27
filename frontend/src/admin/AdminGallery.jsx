import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { get, post, del } from '../utils/api';
import Spinner from '../components/Spinner';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const fetchImages = async () => {
    try {
      const res = await get('/gallery');
      const data = res.data.images || res.data;
      setImages(Array.isArray(data) ? data : []);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files || files.length === 0) { setError('Please select at least one image'); return; }
    if (!category.trim()) { setError('Please enter a category'); return; }
    setError('');
    setUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('category', category);
        if (caption) formData.append('caption', caption);
        await post('/gallery', formData);
      }
      setCategory('');
      setCaption('');
      setFiles(null);
      if (fileRef.current) fileRef.current.value = '';
      await fetchImages();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await del(`/gallery/${deleteId}`);
      setImages((prev) => prev.filter((img) => img._id !== deleteId));
    } catch {
      setError('Failed to delete image');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <Spinner size="lg" className="py-20" />;

  return (
    <div>
      {/* Upload Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="font-heading text-lg font-semibold text-dark-900 mb-4">Upload Images</h3>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images *</label>
              <input
                type="file"
                ref={fileRef}
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value.toUpperCase())}
                placeholder="e.g., HERO, Education"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Use <strong>HERO</strong> for Home screen carousel</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload
              </>
            )}
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No images uploaded yet</p>
          </div>
        ) : (
          images.map((img) => {
            const src = img.image?.startsWith('http') ? img.image : `https://ngo-org.onrender.com${img.image}`;
            return (
              <div key={img._id} className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
                <img src={src} alt={img.caption || ''} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                {img.category && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary-600/90 text-white text-xs rounded-full">
                    {img.category}
                  </span>
                )}
                <button
                  onClick={() => setDeleteId(img._id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {img.caption && (
                  <p className="absolute bottom-2 left-2 right-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {img.caption}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scaleIn">
            <h3 className="font-heading text-lg font-bold text-dark-900 mb-2">Delete Image?</h3>
            <p className="text-gray-600 text-sm mb-6">This action cannot be undone. The image will be permanently removed.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
