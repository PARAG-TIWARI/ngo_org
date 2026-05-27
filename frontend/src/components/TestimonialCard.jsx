import { Quote } from 'lucide-react';

export default function TestimonialCard({ quote, author, role, delay = 0 }) {
  return (
    <div
      className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover-lift"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative quote */}
      <div className="absolute -top-3 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
        <Quote className="w-5 h-5 text-white" />
      </div>

      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-50 to-transparent rounded-tr-2xl opacity-60" />

      <p className="text-gray-700 leading-relaxed italic mb-6 relative z-10 pt-2">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-heading font-bold text-sm">
          {author?.charAt(0)}
        </div>
        <div>
          <p className="font-heading font-semibold text-dark-900 text-sm">{author}</p>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}
