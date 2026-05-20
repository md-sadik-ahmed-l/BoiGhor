import React from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "next/link";
import { User } from "lucide-react";

const LibraryCard = ({ roomData }) => {

  const {
    _id,
    roomName,
    floor,
    category,
    hourlyRate,
    capacity,
    image,
  } = roomData;

  return (
    <div className="group relative p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:shadow-md rounded-2xl overflow-hidden transition-all duration-300 max-w-sm">

      
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          alt={roomName}
          src={image.trimStart()}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />

       
        {category && (
          <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md border border-white/10 text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full">
            {category}
          </span>
        )}

       
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md border border-amber-400/20 rounded-xl px-3 py-1.5">
          <span className="text-amber-400 font-black text-lg">${hourlyRate}</span>
          <span className="text-white/80 text-[10px] ml-1">/hr</span>
        </div>
      </div>

      
      <div className="py-5 space-y-4">
        <div className="space-y-1">
          <p className="flex items-center gap-1 text-xs text-black">
            <MdLocationOn className="text-amber-400 shrink-0 text-xl" />
            {floor}
          </p>
          <h1 className="text-xl font-black text-black leading-tight">{roomName}</h1>
        </div>

        <div className="flex items-center gap-2">
         
            <h1><User className="text-black" /></h1>
            <h1 className="">Capacity: <span className="text-black font-semibold">{capacity}</span></h1>
          
        </div>

        
        <div className="">
          <div className="border-t border-[#8e8d8d] m-5" />

        
        <Link href={`/library/${_id}`}>
          <div className="group/btn flex items-center justify-between bg-[#ecebeb] hover:bg-amber-400 border border-[#dcdcdc] hover:border-amber-400 rounded-xl px-5 py-3 transition-all duration-200 cursor-pointer">
            <span className="text-amber-400 group-hover/btn:text-black text-sm font-bold tracking-widest uppercase transition-colors duration-200">
              View Details
            </span>
            <HiArrowUpRight className="text-amber-400 group-hover/btn:text-black text-base transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;



//  "_id": "6a0b0845b58cce70ac7a74ad",
//     "roomName": "Team Collaboration Room F6",
//     "description": "Large collaborative room equipped with projector and ample seating for teams.",
//     "image": "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
//     "floor": "5th Floor",
//     "capacity": 10,
//     "hourlyRate": 15,
//     "amenities": [
//       "Projector",
//       "Whiteboard",
//       "Wi-Fi",
//       "Power Outlets",
//       "Air Conditioning"
//     ]