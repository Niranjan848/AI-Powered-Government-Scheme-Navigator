export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-row">
        <div className="skeleton-pill skeleton shimmer" style={{ width: 96 }} />
        <div className="skeleton-pill skeleton shimmer" style={{ width: 64 }} />
      </div>

      <div className="skeleton-lines">
        <div className="skeleton-line skeleton shimmer" />
        <div className="skeleton-line skeleton shimmer short" />
        <div className="skeleton-line skeleton shimmer medium" />
      </div>

      <div className="skeleton-footer">
        <div className="skeleton-pill skeleton shimmer" style={{ width: 120 }} />
        <div className="skeleton-pill skeleton shimmer" style={{ width: 84 }} />
      </div>
    </div>
  );
}
