"use client";
import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      
            <div className="text-center max-w-lg">
                
                
                <h1 className="text-7xl font-extrabold text-indigo-600 mb-4 animate-pulse">
                404
                </h1>

            
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                Oops! Page not found
                </h2>

            
                <p className="text-gray-500 mb-6">
                The page you are looking for might have been removed, had its name
                changed, or is temporarily unavailable.
                </p>

                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition-all duration-300"
                >
                    Go Home
                </Link>

                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium shadow hover:bg-gray-100 transition-all duration-300"
                >
                    Go Back
                </button>
                </div>

                
                <div className="mt-10 opacity-60">
                <div className="w-24 h-24 mx-auto bg-indigo-200 rounded-full blur-2xl"></div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;