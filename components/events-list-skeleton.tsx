export function EventsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border shadow-sm flex flex-col gap-6 py-6 overflow-hidden animate-pulse pt-0"
        >
          {/* Image */}
          <div className="h-48 w-full bg-gray-200"></div>

          {/* Header */}
          <div className="px-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-2">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Content */}
          <div className="px-6 space-y-2">
            {/* Date row */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Location row */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>

            {/* City row */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 flex items-center pt-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-28"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
