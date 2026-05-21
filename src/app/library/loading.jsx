"use client";

import { Skeleton } from "@heroui/react";

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      <div className="py-5 sticky top-16 z-50 bg-white">
        <Skeleton className="w-72 h-12 rounded-xl mb-6" />

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Skeleton className="w-full md:w-[500px] h-14 rounded-xl" />
          <Skeleton className="w-32 h-14 rounded-xl" />
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        <div className="hidden sm:flex flex-col lg:col-span-3 sticky top-59 bg-zinc-900 p-6 rounded-2xl h-fit gap-5">
          <Skeleton className="w-40 h-8 rounded-lg" />

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                className="w-full h-5 rounded-md"
              />
            ))}
          </div>

          <Skeleton className="w-full h-px rounded-full" />

          <Skeleton className="w-36 h-8 rounded-lg" />

          <div className="flex gap-3">
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-full h-12 rounded-lg" />
          </div>

          <Skeleton className="w-full h-px rounded-full" />

          <Skeleton className="w-32 h-8 rounded-lg" />

          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                className="w-full h-5 rounded-md"
              />
            ))}
          </div>

          <Skeleton className="w-full h-14 rounded-xl mt-4" />
        </div>

        
        <div className="lg:col-span-9 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6">
            <Skeleton className="w-56 h-10 rounded-xl" />
            <Skeleton className="w-52 h-14 rounded-xl" />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:gap-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="border border-zinc-200 rounded-2xl p-4 space-y-4"
              >
                <Skeleton className="w-full h-52 rounded-2xl" />

                <Skeleton className="w-3/4 h-6 rounded-lg" />

                <Skeleton className="w-1/2 h-5 rounded-lg" />

                <div className="flex justify-between items-center">
                  <Skeleton className="w-24 h-5 rounded-lg" />
                  <Skeleton className="w-20 h-10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;