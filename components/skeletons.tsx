export function FiltersSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        {/* City Filter Skeleton */}
        <div className="flex flex-col gap-2 flex-1 sm:max-w-[200px]">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Category Filter Skeleton */}
        <div className="flex flex-col gap-2 flex-1 sm:max-w-[200px]">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Date Filter Skeleton */}
        <div className="flex flex-col gap-2 flex-1 sm:max-w-[200px]">
          <div className="h-4 bg-gray-200 rounded w-8"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Clear Filters Button Skeleton */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <div className="h-5"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
          <div className="h-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
