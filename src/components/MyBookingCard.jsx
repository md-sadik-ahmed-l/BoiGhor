"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@heroui/react";
import { FaEye } from "react-icons/fa6";
import { MdLocationOn, MdAccessTime, MdCalendarMonth } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { CancelBooking } from "./CancelBooking";
import { MyBookingDelete } from "./MyBookingDelete";

const statusConfig = {
  Confirmed: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  Pending: {
    dot: "bg-amber-400 animate-pulse",
    text: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  Cancelled: {
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
  },
};

const MyBookingCard = ({ myBooking }) => {
  const {
    roomName,
    image,
    totalPrice,
    departureDate,
    startTime,
    endTime,
    duration,
    floor,
    status,
  } = myBooking;

  const style = statusConfig[status] ?? statusConfig.Pending;

  const formattedDate = departureDate?.[0]
    ? new Date(departureDate[0]).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date not set";

  return (
    <div className="group max-w-6xl relative flex flex-col p-4 sm:flex-row gap-5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/25 rounded-2xl overflow-hidden transition-all duration-300">

      
      <div className="relative w-full sm:w-44 h-44 sm:h-auto shrink-0">
        <Image
          src={image}
          alt={roomName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0f]/60 hidden sm:block" />
      </div>

      
      <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-5 px-5 py-5 sm:py-0 sm:pr-6">

        
        <div className="space-y-1.5 min-w-0">
          <h1 className="text-xl font-black text-white ">{roomName}</h1>
          <p className="flex items-center gap-1 text-sm text-white/40">
            <MdLocationOn className="text-amber-400 shrink-0" />
            {floor}
          </p>
          
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold border rounded-full px-3 py-1 mt-1 ${style.bg} ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {status}
          </span>
        </div>

        
        <div className="flex flex-col items-start sm:items-center gap-1 shrink-0">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/50 font-semibold">Date</p>
          <div className="flex items-center gap-1.5 text-white/80 text-sm">
            
            <span>{formattedDate}</span>
          </div>
        </div>

        
        <div className="flex flex-col items-start sm:items-center gap-1 shrink-0">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 font-semibold">Time</p>
          <div className="flex items-center gap-1.5 text-white/70 text-sm">
            <MdAccessTime className="text-amber-400" />
            <span className="font-mono text-[17px]">{startTime}</span>
            <span className="text-white/50">→</span>
            <span className="font-mono text-[17px]">{endTime}</span>
          </div>
          {duration && (
            <p className="text-[15px] text-white/40">{duration}h duration</p>
          )}
        </div>

        
        <div className="flex flex-col items-start sm:items-center gap-1 shrink-0">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/50 font-semibold">Total</p>
          <span className="text-2xl font-black text-amber-400">${totalPrice}</span>
        </div>

        
        <div>
          {
            status === "Confirmed" ? 
              <div className="flex items-center gap-3 shrink-0">
                <CancelBooking myBooking={myBooking} disabled={status === "Cancelled"}></CancelBooking>
              </div> 
              : 
              <div>
                <MyBookingDelete myBooking={myBooking}></MyBookingDelete>
              </div>
          }
        </div>
        
      </div>
    </div>
  );
};

export default MyBookingCard;