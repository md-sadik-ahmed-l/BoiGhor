

import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen animate-pulse bg-white dark:bg-black">
      
      
      <section className="relative overflow-hidden pt-20 pb-32 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            
            <div className="h-14 md:h-20 w-3/4 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-6" />

            <div className="space-y-3 mb-10">
              <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-5 w-11/12 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-5 w-8/12 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="h-14 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-14 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
         
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="h-10 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-4" />
              <div className="h-5 w-72 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            </div>

            <div className="hidden sm:block h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden"
              >
                
              
                <div className="h-56 w-full bg-zinc-200 dark:bg-zinc-800" />

               
                <div className="p-5">
                  <div className="h-7 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4" />

                  <div className="space-y-3 mb-6">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                    <div className="h-4 w-10/12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                    <div className="h-4 w-8/12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                    <div className="h-10 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="h-10 w-72 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6" />

                <div className="h-7 w-44 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4" />

                <div className="space-y-3">
                  <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-4 w-10/12 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-4 w-8/12 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-zinc-800 dark:bg-zinc-950 border-t border-zinc-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="h-12 w-3/4 mx-auto bg-zinc-700 rounded-2xl mb-6" />

          <div className="space-y-3 mb-10">
            <div className="h-5 w-full bg-zinc-700 rounded-full" />
            <div className="h-5 w-9/12 mx-auto bg-zinc-700 rounded-full" />
          </div>

          <div className="h-14 w-64 mx-auto bg-zinc-700 rounded-xl" />
        </div>
      </section>
    </div>
  );
};

export default Loading;