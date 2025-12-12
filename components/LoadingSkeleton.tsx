
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse bg-slate-900 rounded-xl overflow-hidden aspect-[2/3] flex flex-col">
          <div className="flex-1 bg-slate-800" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-800 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
