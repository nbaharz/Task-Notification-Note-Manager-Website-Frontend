//Bu kullanilmiyor
export default function NoteBoardSkeleton() {
  return (
    <main className="p-4 sm:p-6 md:p-8 lg:p-12 min-h-screen bg-gradient-to-r from-purple-200 to-yellow-100 text-gray-900 font-sans animate-pulse">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="h-10 w-48 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-28 bg-gray-200 rounded" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        {/* Left: Notes */}
        <div className="w-full lg:w-[30%] space-y-6">
          <div className="h-6 w-24 bg-gray-300 rounded" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-full aspect-square max-w-[200px] bg-white/60 rounded-xl border border-white/50 backdrop-blur-md"
              />
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden lg:block lg:w-[5%]" />

        {/* Right: To Do */}
        <div className="w-full lg:w-[30%] space-y-4">
          <div className="h-6 w-24 bg-gray-300 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/60 rounded-xl border border-white/50 backdrop-blur-md" />
          ))}
        </div>
      </div>
    </main>
  );
}
