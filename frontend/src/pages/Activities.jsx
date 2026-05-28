import { useEffect, useState } from 'react';
import { Search, X, Calendar, MapPin } from 'lucide-react';
import { FALLBACK_IMAGE, get, handleBrokenImage, normalizeImageUrl } from '../utils/api';
import SectionTitle from '../components/SectionTitle';
import ActivityCard from '../components/ActivityCard';
import Spinner from '../components/Spinner';

const fallbackActivities = [
  {
    _id: '1',
    title: 'Annual Tree Plantation Drive 2025',
    description:
      'Over 500 saplings were planted along the Ganga riverbank with enthusiastic participation from local school students, teachers, and community members. Species included neem, peepal, banyan, and mango.',
    date: '2025-07-15',
    location: 'BHOPAL, MP',
  },
  {
    _id: '2',
    title: 'Girls Education Awareness Rally',
    description:
      'A city-wide awareness rally promoting girls\' education with participation from over 1,000 students, parents, and teachers. The event featured speeches, street plays, and poster campaigns.',
    date: '2025-09-08',
    location: 'BHOPAL, MP',
  },
  {
    _id: '3',
    title: 'Free Health Camp — World Health Day',
    description:
      'Comprehensive free medical check-ups including eye tests, blood sugar screening, blood pressure monitoring, and dental examination. Over 300 patients were examined and referred for further treatment.',
    date: '2025-04-07',
    location: 'BHOPAL, MP',
  },
  {
    _id: '4',
    title: 'Water Conservation Workshop',
    description:
      'A hands-on workshop teaching communities about rainwater harvesting, check dam construction, and sustainable water use practices. Participants built a model rainwater harvesting system.',
    date: '2025-06-22',
    location: 'BHOPAL, MP',
  },
  {
    _id: '5',
    title: 'Skill Development — Tailoring Training',
    description:
      'A 3-month tailoring training program for women from economically weaker sections. 25 women graduated and received sewing machines to start their own micro-enterprises.',
    date: '2025-03-15',
    location: 'BHOPAL, MP',
  },
  {
    _id: '6',
    title: 'Clean India Drive — Swachh Bharat',
    description:
      'Community-wide cleanliness drive covering main roads, marketplaces, and public spaces. Volunteers collected over 500 kg of waste and promoted dustbin usage and waste segregation.',
    date: '2025-10-02',
    location: 'BHOPAL, MP',
  },
];

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await get('/activities');
        const data = res.data.activities || res.data;
        setActivities(Array.isArray(data) && data.length > 0 ? data : fallbackActivities);
      } catch {
        setActivities(fallbackActivities);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = activities.filter(
    (a) =>
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.description?.toLowerCase().includes(search.toLowerCase()) ||
      a.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            Our Activities
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fadeInUp delay-100">
            Explore our events, campaigns, and community programs making a difference every day
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          </div>

          {loading ? (
            <Spinner size="lg" className="py-20" />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg mb-2">No activities found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((activity, idx) => (
                <ActivityCard key={activity._id || idx} activity={activity} onClick={() => setSelectedActivity(activity)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl animate-scaleIn my-8 relative flex flex-col max-h-[90vh]">
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="overflow-y-auto custom-scrollbar flex-1 rounded-2xl">
              {/* Main Image */}
              <div className="w-full h-64 sm:h-80 md:h-96 relative bg-gray-100">
                {selectedActivity.image ? (
                  <img
                    src={normalizeImageUrl(selectedActivity.image) || FALLBACK_IMAGE}
                    alt={selectedActivity.title}
                    onError={handleBrokenImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl font-heading font-bold">
                    {selectedActivity.title?.charAt(0) || 'A'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">{selectedActivity.title}</h2>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-gray-200">
                    {selectedActivity.date && (
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        {new Date(selectedActivity.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    {selectedActivity.location && (
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-400" />
                        {selectedActivity.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                  About this Activity
                </h3>
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-10 text-base md:text-lg">
                  {selectedActivity.description}
                </p>
                
                {selectedActivity.extraImages && selectedActivity.extraImages.length > 0 && (
                  <div>
                    <h3 className="font-heading text-xl font-bold text-dark-900 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                      Gallery
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {selectedActivity.extraImages.map((img, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100 group">
                            <img
                              src={normalizeImageUrl(img.imageUrl) || FALLBACK_IMAGE}
                              alt={img.caption || `Gallery ${idx + 1}`}
                              onError={handleBrokenImage}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          {img.caption && (
                            <p className="text-sm text-gray-600 text-center px-1 line-clamp-2" title={img.caption}>
                              {img.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
