"use client";
import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "@gravity-ui/icons";
import { Button, DateField, Label, Description } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const OPENING_HOUR = 9;
const CLOSING_HOUR = 18;


const startTimeOptions = Array.from(
  { length: CLOSING_HOUR - OPENING_HOUR },
  (_, i) => {
    const hour = OPENING_HOUR + i;
    return {
      label: `${hour}:00`,
      value: hour,
    };
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

  const endHour = startHour && duration
    ? Number(startHour) + Number(duration)
    : null;

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

    // const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking-rooms`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    if(data.success){
        toast.success("Booking Success full")
    }else{
        toast.warning('This time is already booked!!')
    }
  };

  return (
    <div className="flex flex-col mt-8 w-80 border border-[#e6e4e4] px-5 space-y-7 py-10 bg-base-200 rounded-md shadow-md hover:shadow-xl">
      
     
      <div className="space-y-1">
        <p>Per hour</p>
        <h4>
          <span className="text-4xl text-cyan-500">${totalPrice}</span>
        </h4>
        {totalPrice > 0 && (
          <p className="text-sm text-gray-500">
            total: <span className="font-bold text-cyan-600">${totalPrice}</span>{" "}
            ({duration} hour)
          </p>
        )}
      </div>

      
      <div>
        <DateField isRequired onChange={setDepartureDate} className="w-full" name="date">
          <Label>Booking date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      </div>

     
      <div className="space-y-1">
        <label className="text-sm font-medium">Start time</label>
        <select
          value={startHour}
          onChange={(e) => {
            setStartHour(e.target.value);
            setDuration(""); 
          }}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">-- Choose a time. --</option>
          {startTimeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Description>9:00 AM — 6:00 PM</Description>
      </div>

      
      <div className="space-y-1">
        <label className="text-sm font-medium">For how many hours?</label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          disabled={!startHour}
          className="w-full border rounded px-3 py-2 text-sm disabled:opacity-50"
        >
          <option value="">-- Choose a time. --</option>
          {durationOptions.map((h) => (
            <option key={h} value={h}>
              {h} hour
            </option>
          ))}
        </select>

        {endHour && (
          <p className="text-xs text-gray-500">
            End time: <span className="font-semibold">{endHour}:00</span>
          </p>
        )}
      </div>

      
      <div>
        <Button
          onClick={handleBooking}
          isDisabled={isPending || !user || !departureDate || !startHour || !duration}
          className="text-white bg-cyan-500 rounded-none w-full font-bold"
        >
          {isPending ? "Loading..." : "Book now"} <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default BookingRoomCard;