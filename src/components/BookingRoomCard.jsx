"use client";
import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "@gravity-ui/icons";
import { Button, DateField, Label, Description } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdAccessTime, MdAttachMoney } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";

const OPENING_HOUR = 9;
const CLOSING_HOUR = 18;

const startTimeOptions = Array.from(
  { length: CLOSING_HOUR - OPENING_HOUR },
  (_, i) => {
    const hour = OPENING_HOUR + i;
    return { label: `${hour}:00`, value: hour };
  }
);

const BookingRoomCard = ({ roomDetails }) => {
  const { _id, roomName, hourlyRate, image, floor } = roomDetails;

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  const [startHour, setStartHour] = useState("");
  const [duration, setDuration] = useState("");

  const maxDuration = startHour ? CLOSING_HOUR - Number(startHour) : 0;
  const durationOptions = Array.from({ length: maxDuration }, (_, i) => i + 1);

  const endHour =
    startHour && duration ? Number(startHour) + Number(duration) : null;

  const totalPrice = duration ? Number(duration) * hourlyRate : 0;

  const handleBooking = async () => {
    if (!user) {
      toast.warning("Please login first!");
      return;
    }
    if (!departureDate || !startHour || !duration) {
      toast.warning("Fill in all the information!");
      return;
    }

    const bookingData = {
      userId: user.id,
      userName: user.name,
      roomDetails: _id,
      roomName,
      totalPrice,
      image,
      floor,
      departureDate: departureDate ? new Date(departureDate) : null,
      startTime: `${startHour}:00`,
      endTime: `${endHour}:00`,
      duration: Number(duration),
      status: "Confirmed",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking-rooms`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bookingData),
      }
    );

    const data = await res.json();
    if (data.success) {
      toast.success("Booking Successful");
    } else {
      toast.warning("This time is already booked!!");
    }
  };

  const isReady = !isPending && user && departureDate && startHour && duration;

  return (
    <div className="relative w-full p-6 space-y-6">
      
      <div className="space-y-1 pb-5 border-b border-white/10">
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-semibold">
          Rate
        </p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-black text-amber-400">
            ${totalPrice > 0 ? totalPrice : hourlyRate}
          </span>
          <span className="text-white/40 text-sm pb-1">
            {totalPrice > 0 ? `/ ${duration}h total` : "/ hour"}
          </span>
        </div>
        {totalPrice > 0 && (
          <p className="text-xs text-emerald-400/80 flex items-center gap-1">
            <HiSparkles className="text-emerald-400" />
            {duration} hour{duration > 1 ? "s" : ""} ·{" "}
            <span className="font-bold">${hourlyRate}/hr</span>
          </p>
        )}
      </div>

      
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold block">
          Booking Date
        </label>
        <div className="relative">
          <DateField
            isRequired
            onChange={setDepartureDate}
            className="w-full"
            name="date"
          >
            <DateField.Group className="w-full bg-white/5 border border-white/10 hover:border-amber-400/40 focus-within:border-amber-400/60 rounded-xl px-4 py-3 transition-all duration-200">
              <DateField.Input className="text-white text-sm w-full bg-transparent outline-none">
                {(segment) => (
                  <DateField.Segment
                    segment={segment}
                    className="text-white/70 focus:text-amber-400 focus:bg-amber-400/10 rounded px-0.5"
                  />
                )}
              </DateField.Input>
            </DateField.Group>
          </DateField>
        </div>
      </div>

      
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold block">
          Start Time
        </label>
        <div className="relative">
          <MdAccessTime className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-base pointer-events-none z-10" />
          <select
            value={startHour}
            onChange={(e) => {
              setStartHour(e.target.value);
              setDuration("");
            }}
            className="w-full appearance-none bg-white/5 border border-white/10 hover:border-amber-400/40 focus:border-amber-400/60 text-white/80 text-sm rounded-xl pl-9 pr-4 py-3 outline-none transition-all duration-200 cursor-pointer"
          >
            <option value="" className="bg-[#111118]">
              — Select a time —
            </option>
            {startTimeOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#111118]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-[10px] text-white/25 tracking-wide">
          Available 9:00 AM — 6:00 PM
        </p>
      </div>

     
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold block">
          Duration
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          disabled={!startHour}
          className="w-full appearance-none bg-white/5 border border-white/10 hover:border-amber-400/40 focus:border-amber-400/60 text-white/80 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <option value="" className="bg-[#111118]">
            — How many hours? —
          </option>
          {durationOptions.map((h) => (
            <option key={h} value={h} className="bg-[#111118]">
              {h} hour{h > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        {endHour && (
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/30">Check-out</span>
            <span className="text-amber-400/80 font-bold tracking-wide">
              {endHour}:00
            </span>
          </div>
        )}
      </div>

      
      <div className="border-t border-white/10" />

      
      <button
        onClick={handleBooking}
        disabled={!isReady}
        className={`
          group relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase
          flex items-center justify-center gap-3 overflow-hidden
          transition-all duration-300
          ${
            isReady
              ? "bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40"
              : "bg-white/5 text-white/20 border border-white/10 cursor-not-allowed"
          }
        `}
      >
        {isPending ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          <>
            <span>Book Now</span>
            <ArrowRight
              className={`transition-transform duration-300 ${isReady ? "group-hover:translate-x-1" : ""}`}
            />
          </>
        )}
      </button>

      {!user && !isPending && (
        <p className="text-center text-[11px] text-white/30 tracking-wide">
          Please{" "}
          <a href="/login" className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2">
            sign in
          </a>{" "}
          to book this room
        </p>
      )}
    </div>
  );
};

export default BookingRoomCard;