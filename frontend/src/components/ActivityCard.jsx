import { Calendar, MapPin } from 'lucide-react';

export default function ActivityCard({ activity, onClick }) {
  const { title, description, date, location, image } = activity;

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  const imageUrl = image
    ? (image.startsWith('http') ? image : `https://ngo-org.onrender.com${image}`)
    : null;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover-lift cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-primary-400 text-6xl font-heading font-bold opacity-30">
              {title?.charAt(0) || 'A'}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Location Badge */}
        {location && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-dark-800">
            <MapPin className="w-3 h-3 text-primary-600" />
            {location}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {formattedDate && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </div>
        )}
        <h3 className="font-heading text-lg font-semibold text-dark-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
