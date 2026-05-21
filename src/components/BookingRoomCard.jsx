"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "@gravity-ui/icons";
import { DateField } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdAccessTime } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { useRouter } from "next/navigation";

import { today, getLocalTimeZone } from "@internationalized/date";

const OPENING_HOUR = 9;
const CLOSING_HOUR = 18;

const startTimeOptions = Array.from(
  { length: CLOSING_HOUR - OPENING_HOUR },
  (_, i) => {
    const hour = OPENING_HOUR + i;
    return { label: `${hour}:00`, value: hour };
  },
);

const BookingRoomCard = ({ roomDetails }) => {
  const { _id, roomName, hourlyRate, image, floor } = roomDetails;

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  const [startHour, setStartHour] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const currentDate = today(getLocalTimeZone());

  const maxDate = currentDate.add({ years: 1 });

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

    if (
      departureDate.compare(currentDate) < 0 ||
      departureDate.compare(maxDate) > 0
    ) {
      toast.error("Please select a valid booking date!");
      return;
    }

    setLoading(true);

    try {
      
      const bookingDate = new Date(
        departureDate.year,
        departureDate.month - 1,
        departureDate.day,
      );

      const bookingData = {
        userId: user.id,
        userName: user.name,
        roomDetails: _id,
        roomName,
        totalPrice,
        image,
        floor,
        departureDate: bookingDate,
        startTime: `${startHour}:00`,
        endTime: `${endHour}:00`,
        duration: Number(duration),
        status: "Confirmed",
      };

      const {data:tokenData}= await authClient.token()
      

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking-rooms`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            
            authorization: `Bearer ${tokenData?.token}`

          },

          body: JSON.stringify(bookingData),
          
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Booking Successful");

        // reset form
        setDepartureDate(null);
        setStartHour("");
        setDuration("");

        router.push("/my-bookings");
      } else {
        toast.error(data.message || "This time is already booked!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
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
            {duration} hour{duration > 1 ? "s" : ""} ·
            <span className="font-bold">${hourlyRate}/hr</span>
          </p>
        )}
      </div>

      
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold block">
          Booking Date
        </label>

        <DateField
          isRequired
          value={departureDate}
          onChange={setDepartureDate}
          minValue={currentDate}
          maxValue={maxDate}
          className="w-full"
        >
          <DateField.Group className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <DateField.Input className="text-white text-sm w-full bg-transparent outline-none">
              {(segment) => (
                <DateField.Segment
                  segment={segment}
                  className="text-white/70"
                />
              )}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      </div>

      
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold block">
          Start Time
        </label>

        <div className="relative">
          <MdAccessTime className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-base z-10" />

          <select
            value={startHour}
            onChange={(e) => {
              setStartHour(e.target.value);
              setDuration("");
            }}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-9 pr-4 py-3"
          >
            <option value="">Select time</option>

            {startTimeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      
      <div className="space-y-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold block">
          Duration
        </label>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          disabled={!startHour}
          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3"
        >
          <option value="">Select duration</option>

          {durationOptions.map((h) => (
            <option key={h} value={h}>
              {h} hour{h > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        {endHour && (
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/30">Check-out</span>

            <span className="text-amber-400 font-bold">{endHour}:00</span>
          </div>
        )}
      </div>

      
      <button
        onClick={handleBooking}
        disabled={!isReady || loading}
        className={`
          group relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase
          flex items-center justify-center gap-3 overflow-hidden
          transition-all duration-300
          ${
            isReady
              ? "bg-amber-400 text-black hover:bg-amber-300"
              : "bg-white/5 text-white/20 border border-white/10"
          }
        `}
      >
        {loading ? (
          <span className="animate-pulse">Booking...</span>
        ) : (
          <>
            <span>Book Now</span>
            <ArrowRight />
          </>
        )}
      </button>
    </div>
  );
};

export default BookingRoomCard;
