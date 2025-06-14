import React from 'react';

export default function ExternalServicesSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm w-full max-w-[400px] min-w-[350px] border border-gray-200/70 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-3/4 mb-6"></div> {/* Title skeleton */}
      <div className="flex flex-col gap-5">
        {[...Array(2)].map((_, index) => ( // Render 2 skeleton cards
          <div
            key={index}
            className="relative flex items-start gap-5 border-2 border-gray-200 rounded-xl px-6 py-5 bg-gray-100"
          >
            <div className="relative p-4 bg-gray-200 rounded-xl shadow-xs border border-gray-300 h-16 w-16 flex items-center justify-center">
              {/* Icon placeholder */}
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div> 
            </div>
            <div className="text-left flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/5 mb-2"></div> {/* Name skeleton */}
              <div className="h-4 bg-gray-200 rounded w-4/5"></div> {/* Description skeleton */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}