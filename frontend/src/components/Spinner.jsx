export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} rounded-full border-3 border-primary-200 border-t-primary-600 animate-spin`}
        style={{ animationDuration: '0.8s' }}
      />
    </div>
  );
}
