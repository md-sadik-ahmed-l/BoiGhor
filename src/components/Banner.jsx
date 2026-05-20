"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

import LibraryCard from "./Library/LibraryCard";
import LoadingSpinner from "./LoadingSpinner";

export default function Home() {
  const [roomsData, setRoomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "BoiGhor || Home";

    async function fetchRooms() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-rooms`);

        const data = await res.json();

        console.log(data);

        if (res.ok) {
          
          setRoomsData(data?.roomsData || []);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setRoomsData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      <section className="relative overflow-hidden bg-white dark:bg-black pt-20 pb-32 border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.05]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
              Find Your Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800 dark:from-zinc-300 dark:to-white">
                Study Room
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              Browse and book quiet, private study rooms in your library. List
              your own room and earn. Focus on what matters, we handle the
              space.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/library"
                className="inline-flex justify-center items-center gap-2 px-8 py-3.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
              >
                Explore Rooms
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/add-room"
                className="inline-flex justify-center items-center px-8 py-3.5 border border-zinc-300 dark:border-zinc-700 text-base font-medium rounded-full text-zinc-700 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              >
                List Your Room
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

     
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Available Study Rooms
              </h2>

              <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                Book a room that fits your needs perfectly.
              </p>
            </div>

            <Link
              href="/library"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-black dark:text-white hover:underline"
            >
              View all rooms
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : roomsData?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {roomsData.map((roomData) => (
                <LibraryCard
                  key={roomData._id}
                  roomData={roomData}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <BookOpen className="mx-auto h-12 w-12 text-zinc-400 mb-4" />

              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                No rooms available
              </h3>

              <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                There are currently no study rooms listed.
              </p>

              <Link
                href="/add-room"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Be the first to list
              </Link>
            </div>
          )}

          <div className="mt-10 sm:hidden">
            <Link
              href="/library"
              className="w-full flex items-center justify-center gap-1 px-4 py-3 border border-zinc-300 dark:border-zinc-700 text-sm font-semibold rounded-md text-black bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
            >
              View all rooms
            </Link>
          </div>
        </div>
      </section>

    
      <section className="py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Why Choose StudyNook?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-black dark:text-white" />
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Instant Booking
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400">
                Book your ideal study space in seconds with our streamlined
                checkout process and real-time availability.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-black dark:text-white" />
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                No Double Bookings
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400">
                Our smart conflict detection ensures that your booked time slot
                is exclusively yours, guaranteed.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-black dark:text-white" />
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Flexible Hours
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400">
                From early morning review sessions to late-night cramming, find
                rooms available when you need them most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Ready to boost your productivity?
          </h2>

          <p className="text-xl text-zinc-400 mb-10">
            Join thousands of students who have found their perfect focus zone
            on StudyNook.
          </p>

          <Link
            href="/register"
            className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-zinc-200 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}