import './skeleton.css';

export default function Skeleton({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton height="200px" borderRadius="8px" />
      <div className="skeleton-card__content">
        <Skeleton width="80%" height="24px" />
        <Skeleton width="60%" height="16px" />
        <Skeleton width="40%" height="20px" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="skeleton-text">
      {Array.from({ length: lines }).map((_, i) => {
        const w = i === lines - 1 ? '60%' : '100%';
        return (
          <Skeleton 
            key={`skeleton-line-${w}-${i}`} 
            width={w} 
            height="16px" 
            className="skeleton-text__line"
          />
        );
      })}
    </div>
  );
}
