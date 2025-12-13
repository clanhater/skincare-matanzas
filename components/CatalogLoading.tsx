export default function CatalogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto mt-2"></div>
      </div>
      
      <div className="py-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full h-10 bg-gray-200 rounded-full"></div>
          <div className="w-full md:w-64 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[1/1.2] bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}