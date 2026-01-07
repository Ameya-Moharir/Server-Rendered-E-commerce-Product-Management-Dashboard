export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-8 bg-gray-200 rounded flex-1" />
          <div className="h-8 bg-gray-200 rounded w-10" />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-6 bg-gray-200 rounded w-32" />
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-48 mb-4" />
      <div className="h-64 bg-gray-200 rounded" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gray-50 p-4 border-b">
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 border-b border-gray-100">
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
