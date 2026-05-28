import { useState, useEffect } from 'react';
import { FALLBACK_IMAGE, get, handleBrokenImage, normalizeImageUrl } from '../utils/api';
import SectionTitle from '../components/SectionTitle';
import { ShieldCheck, Check, X } from 'lucide-react';

export default function Certifications() {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await get('/certificates');
        setCredentials(res.data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pt-28 pb-20 bg-light-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionTitle
            title="Registrations & Credentials"
            subtitle="Maharshi Dayanand Jan Kalyan Sanstha operates under strict transparency guidelines and holds full legal accreditations from the Government of India."
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : credentials.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No certificates found.
          </div>
        ) : (
          <div className="space-y-12">
            {credentials.map((cred, idx) => (
              <div
                key={cred.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/30 border border-zinc-200/50 p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Document Photo Preview */}
                <div
                  onClick={() => {
                    if (cred.imageUrl) {
                      const fullUrl = normalizeImageUrl(cred.imageUrl) || '';
                      setSelectedImage(fullUrl);
                      setSelectedTitle(cred.title);
                    }
                  }}
                  className={`w-full lg:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative group flex-shrink-0 flex items-center justify-center ${
                    cred.imageUrl ? 'cursor-zoom-in' : ''
                  }`}
                >
                  {cred.imageUrl ? (
                    <img
                      src={normalizeImageUrl(cred.imageUrl)}
                      alt={cred.title}
                      onError={handleBrokenImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-gray-400">No Image Provided</span>
                  )}
                  <div className="absolute inset-0 bg-dark-900/10 pointer-events-none" />
                  <div className="absolute top-4 right-4 bg-green-500/90 text-white rounded-full p-1.5 shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Certificate Information */}
                <div className="flex-grow space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200/60 text-green-700 text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    Government Verified
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-dark-900">{cred.title}</h3>
                  
                  <div className="grid grid-cols-1 gap-4 py-2 border-y border-zinc-100 text-sm">
                    <div>
                      <span className="text-zinc-400 block text-xs font-semibold uppercase tracking-wider">Authority / Verified By</span>
                      <span className="text-dark-800 font-medium">{cred.verifiedBy || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="text-zinc-400 text-xs font-semibold">
                    Verification Status: <span className="text-green-600 font-bold">Approved & Valid</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Full Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900/90 backdrop-blur-md p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50 duration-200"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Image container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking the image box itself
          >
            <img
              src={selectedImage}
              alt={selectedTitle}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10 cursor-default"
            />
            {selectedTitle && (
              <h4 className="mt-4 text-white text-lg font-semibold font-heading tracking-wide text-center bg-dark-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                {selectedTitle}
              </h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
