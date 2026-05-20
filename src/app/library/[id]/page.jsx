// import { ArrowRight } from "@gravity-ui/icons";
import BookingRoomCard from "@/components/BookingRoomCard";
import { DeleteRoom } from "@/components/DeleteRoom";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { IoWifi, IoTv, IoSnow, IoRestaurant } from "react-icons/io5";
import { MdLocationOn, MdPeople, MdStar } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";

const RoomsDetailsPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-rooms/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const roomDetails = await res.json();

  const user = roomDetails.user;
  const { amenities } = roomDetails;

  const session = await auth.api.getSession({ headers: await headers() });
  const crantuserId = session.session.userId;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Image Section */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <Image
          alt={roomDetails.roomName}
          src={roomDetails.image}
          fill
          className="object-cover scale-105 transition-transform duration-700"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/50 to-transparent" />

        {/* Floating badge */}
        <div className="absolute top-6 left-6">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase">
            <HiSparkles className="text-amber-400 text-sm" />
            Premium Room
          </span>
        </div>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-5xl mx-auto">
          <p className="flex items-center gap-1.5 text-amber-400/80 text-sm font-medium mb-2 tracking-wide">
            <MdLocationOn className="text-amber-400" />
            {roomDetails.floor}
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-white drop-shadow-lg">
            {roomDetails.roomName}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-2 pb-20">
        {/* Quick Stats Bar */}
        <div className="flex flex-wrap gap-4 py-6 border-b border-white/10 mb-10">
          <div className="flex items-center gap-2 text-white/70">
            <MdPeople className="text-amber-400 text-xl" />
            <span className="text-sm">Capacity: <strong className="text-white">{roomDetails.capacity}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <MdStar className="text-amber-400 text-xl" />
            <span className="text-sm">Top Rated</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="text-sm text-emerald-400 font-medium">Available</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Details */}
          <div className="flex-1 space-y-10">
            {/* Overview */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                <h2 className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">Overview</h2>
              </div>
              <p className="text-white/75 text-lg leading-relaxed font-light">
                {roomDetails.description}
              </p>
            </div>

            {/* Amenities */}
            {amenities?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                  <h2 className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">Amenities</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {amenities.map((item, index) => (
                    <span
                      key={index}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-white/80 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Actions */}
            {user === crantuserId && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                  <h2 className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">Manage Room</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="[&_button]:bg-white/10 [&_button]:border [&_button]:border-white/20 [&_button]:text-white [&_button]:hover:bg-white/20 [&_button]:transition-all [&_button]:rounded-xl [&_button]:px-6 [&_button]:py-2.5 [&_button]:text-sm [&_button]:font-semibold">
                    <EditModal roomDetails={roomDetails} />
                  </div>
                  <div className="[&_button]:bg-red-500/10 [&_button]:border [&_button]:border-red-500/30 [&_button]:text-red-400 [&_button]:hover:bg-red-500/20 [&_button]:transition-all [&_button]:rounded-xl [&_button]:px-6 [&_button]:py-2.5 [&_button]:text-sm [&_button]:font-semibold">
                    <DeleteRoom roomDetails={roomDetails} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking Card — wrapped for dark styling */}
          <div className="lg:w-[340px] shrink-0">
            <div className="sticky top-8 bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-md">
              <div className="px-6 pt-6 pb-2">
                <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-1">Reserve Your Stay</p>
              </div>
              <BookingRoomCard roomDetails={roomDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsDetailsPage;