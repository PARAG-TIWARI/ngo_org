export default function ProgramCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <div
      className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover-lift overflow-hidden border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm scale-[1.02]" />
      <div className="absolute inset-[1px] rounded-2xl bg-white -z-[5]" />

      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-5 group-hover:from-primary-500 group-hover:to-primary-700 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
      </div>

      <h3 className="font-heading text-xl font-semibold text-dark-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>

      <div className="mt-5 flex items-center text-primary-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Learn more</span>
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
