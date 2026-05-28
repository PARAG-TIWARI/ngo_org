import { useState } from 'react';
import { handleBrokenImage, normalizeImageUrl } from '../utils/api';
import Lightbox from './Lightbox';

export default function GalleryGrid({ images = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const allCategories = ['All', ...categories];

  const filteredImages =
    activeCategory === 'All'
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredImages.map((img, idx) => {
          const src = img.image || img.url || img;
          const imageUrl = normalizeImageUrl(src);

          return (
            <div
              key={img._id || idx}
              className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer bg-gray-100"
              onClick={() => setLightboxIndex(idx)}
            >
              <img
                src={imageUrl}
                alt={img.caption || `Gallery image ${idx + 1}`}
                onError={handleBrokenImage}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {img.caption && (
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                )}
                {img.category && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-primary-500/80 text-white text-xs rounded-full">
                    {img.category}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images found in this category.
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
          }
        />
      )}
    </div>
  );
}
