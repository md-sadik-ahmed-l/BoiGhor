
import Image from "next/image";
import React from "react";
// import DeleteBooking from "./DeleteBooking";
import { Button } from "@heroui/react";
import { FaEye } from "react-icons/fa6";

const MyBookingCard = ({ myBooking }) => {
  const { roomName, image, totalPrice, departureDate, startTime, endTime, duration, floor, status} = myBooking;


//   const handleCancelBooking = ()=>
  
  return (
    <div className="flex justify-between items-center p-5 border border-[#e4e4e4] shadow-sm ">
      <div className="flex gap-5">
        <div className="relative w-40 h-25">
          <Image
            src={image}
            alt={roomName}
            fill
            className="object-cover"
          ></Image>
        </div>

        <div>
          <h1 className="text-2xl font-bold">{roomName}</h1>
          
          <h4 className="text-xl font-semibold">{floor}</h4>
        </div>
      </div>

      <div>
        <h2>{departureDate[0] || "Set departure date"}</h2>
      </div>
      <div>
        <h1 className="flex items-center">{startTime}<span className="text-2xl">-</span></h1>
        <h1>{endTime}</h1>
      </div>
      <div>
        <h1>${totalPrice}</h1>
      </div>
      <div>
        <h1>{status}</h1>
      </div>

      <div className="flex items-end">
        {/* <DeleteBooking bookingData={bookingData} ></DeleteBooking> */}
        <Button>
          <FaEye />
          View
        </Button>
      </div>
    </div>
  );
};

export default MyBookingCard;