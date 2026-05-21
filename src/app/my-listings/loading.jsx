import React from "react";

const Loading = () => {
  return (
    <div className="max-w-6xl mx-auto my-15 px-4">
      
     
      <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-10"></div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-2xl overflow-hidden"
          >
            
            
            <div className="w-full h-52 bg-gray-200 rounded-xl animate-pulse"></div>

            <div className="py-5 space-y-4">
              
              
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>

              
              <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse"></div>

            
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>

              
              <div className="border-t border-gray-200"></div>

              <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;