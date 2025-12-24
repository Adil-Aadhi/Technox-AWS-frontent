const ProductSkeleton = () => {
  return (
    <div
      className="
        bg-white/5 backdrop-blur-lg border border-white/10
        rounded-xl overflow-hidden shadow-lg
        animate-pulse
      "
    >
      {/* Image skeleton */}
      <div className="aspect-square bg-white/10"></div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <div className="h-4 bg-white/10 rounded w-3/4"></div>

        {/* Price */}
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
