import { useEffect, useState } from 'react';
import { get } from '../utils/api';
import GalleryGrid from '../components/GalleryGrid';
import Spinner from '../components/Spinner';

const fallbackImages = [
  { _id: '1', image: '', caption: 'Tree Plantation Drive', category: 'Environment' },
  { _id: '2', image: '', caption: 'Health Camp 2025', category: 'Health' },
  { _id: '3', image: '', caption: 'School Enrollment', category: 'Education' },
  { _id: '4', image: '', caption: 'Water Harvesting Workshop', category: 'Water' },
  { _id: '5', image: '', caption: 'Women Skill Training', category: 'Rural Development' },
  { _id: '6', image: '', caption: 'Cleanliness Drive', category: 'Environment' },
];

const fallbackCategories = ['Education', 'Environment', 'Health', 'Water', 'Rural Development'];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [imgRes, catRes] = await Promise.all([
          get('/gallery'),
          get('/gallery/categories').catch(() => ({ data: { categories: fallbackCategories } })),
        ]);
        const imgData = imgRes.data.images || imgRes.data;
        const catData = catRes.data.categories || catRes.data;
        setImages(Array.isArray(imgData) && imgData.length > 0 ? imgData : fallbackImages);
        setCategories(Array.isArray(catData) && catData.length > 0 ? catData : fallbackCategories);
      } catch {
        setImages(fallbackImages);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            Photo Gallery
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
            Capturing moments of impact, community, and transformation
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Spinner size="lg" className="py-20" />
          ) : images.length > 0 && images[0].image ? (
            <GalleryGrid images={images} categories={categories} />
          ) : (
            /* Placeholder grid when no real images */
            <div>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['All', ...fallbackCategories].map((cat) => (
                  <button
                    key={cat}
                    className="px-5 py-2 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-primary-50 hover:text-primary-600 transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {[
                  { bg: 'from-primary-200 to-primary-300', label: 'Tree Plantation Drive', h: 'h-64' },
                  { bg: 'from-rose-200 to-rose-300', label: 'Free Health Camp', h: 'h-80' },
                  { bg: 'from-blue-200 to-blue-300', label: 'Education Rally', h: 'h-56' },
                  { bg: 'from-cyan-200 to-cyan-300', label: 'Water Harvesting', h: 'h-72' },
                  { bg: 'from-amber-200 to-amber-300', label: 'Skill Training', h: 'h-64' },
                  { bg: 'from-green-200 to-green-300', label: 'Community Meeting', h: 'h-80' },
                  { bg: 'from-purple-200 to-purple-300', label: 'Awareness Campaign', h: 'h-56' },
                  { bg: 'from-orange-200 to-orange-300', label: 'Clean India Drive', h: 'h-72' },
                  { bg: 'from-teal-200 to-teal-300', label: 'Youth Workshop', h: 'h-64' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`break-inside-avoid rounded-xl bg-gradient-to-br ${item.bg} ${item.h} flex items-center justify-center group hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
                  >
                    <p className="font-heading font-semibold text-white/80 text-lg drop-shadow text-center px-4">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 mt-8 text-sm">
                Gallery images will appear here once uploaded through the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
