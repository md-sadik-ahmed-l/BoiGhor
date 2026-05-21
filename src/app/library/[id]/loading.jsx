

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] animate-pulse">
      
      
      <div className="relative w-full h-[65vh] overflow-hidden bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-5xl mx-auto">
          <div className="h-4 w-32 bg-white/10 rounded mb-4" />
          <div className="h-16 md:h-20 w-3/4 bg-white/10 rounded-2xl" />
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-2 pb-20">
        
        
        <div className="flex flex-wrap gap-4 py-6 border-b border-white/10 mb-10">
          <div className="h-6 w-36 bg-white/10 rounded-full" />
          <div className="h-6 w-28 bg-white/10 rounded-full" />
          <div className="h-6 w-32 bg-white/10 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
         
          <div className="flex-1 space-y-10">
            
           
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                <div className="h-4 w-28 bg-white/10 rounded" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-11/12 bg-white/10 rounded" />
                <div className="h-4 w-10/12 bg-white/10 rounded" />
                <div className="h-4 w-9/12 bg-white/10 rounded" />
              </div>
            </div>

            
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                <div className="h-4 w-28 bg-white/10 rounded" />
              </div>

              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-28 bg-white/10 rounded-full"
                  />
                ))}
              </div>
            </div>

            
            <div>
              <div className="flex items-center gap-3 mb-5 mt-10">
                <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                <div className="h-4 w-32 bg-white/10 rounded" />
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-32 bg-white/10 rounded-xl" />
                <div className="h-12 w-32 bg-red-500/10 rounded-xl" />
              </div>
            </div>
          </div>

        
          <div className="lg:w-[340px] shrink-0">
            <div className="sticky top-8 bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-6 space-y-5">
              <div className="h-4 w-40 bg-white/10 rounded" />

              <div className="space-y-4">
                <div className="h-12 w-full bg-white/10 rounded-xl" />
                <div className="h-12 w-full bg-white/10 rounded-xl" />
                <div className="h-12 w-full bg-white/10 rounded-xl" />
              </div>

              <div className="h-14 w-full bg-amber-400/20 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;