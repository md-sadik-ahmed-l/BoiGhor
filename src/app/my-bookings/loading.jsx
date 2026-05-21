

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white animate-pulse">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
            <div className="h-3 w-16 bg-white/10 rounded" />
          </div>

          <div className="h-14 w-72 bg-white/10 rounded-2xl mb-4" />

          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="h-5 w-80 bg-white/10 rounded" />

            <div className="h-12 w-44 bg-white/10 rounded-full" />
          </div>
        </div>

        
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row gap-5">
                
                
                <div className="w-full md:w-60 h-44 bg-white/10 rounded-2xl" />

                
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="h-7 w-52 bg-white/10 rounded mb-3" />
                      <div className="h-4 w-40 bg-white/10 rounded" />
                    </div>

                    <div className="h-9 w-28 bg-white/10 rounded-full" />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-11/12 bg-white/10 rounded" />
                    <div className="h-4 w-8/12 bg-white/10 rounded" />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <div className="h-11 w-32 bg-white/10 rounded-xl" />
                    <div className="h-11 w-32 bg-red-500/10 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;