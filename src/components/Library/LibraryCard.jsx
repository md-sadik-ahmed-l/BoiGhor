
import React from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@heroui/react";

const LibraryCard = ({ roomData }) => {
  const {
    _id,
    roomName,
    floor,
    category,
    hourlyRate,
    capacity,
    departureDate,
    image,
    description,
  } = roomData;

  console.log(roomData)
  
  return (
    <div className="max-w-100 ">
      <div className="space-y-5">

        <div className="relative w-full h-56">
          <Image
            alt={roomName}
            src={image.trimStart()}
            fill         
            className="object-cover"
          />
        </div>

        <div>

          <h3 className="flex items-center">
            <MdLocationOn></MdLocationOn>
            {floor}
          </h3>

            <h1 className="text-2xl">{roomName}</h1>

          <div className="flex justify-between mt-2">
            <h4 className="flex items-center  gap-1"><span><IoCalendarNumberOutline /> </span><span>Capacity:{capacity}</span></h4>

          
            <h4>
              <span className="text-2xl">${hourlyRate}</span>
              <span>/per hour</span>
            </h4>
          </div>

          
        </div>
        <div>
            <Link href={`/library/${_id}`}><Button variant="outline" className='text-[#15A1BF] font-extrabold text-'>BOOK NOW<span className="text-[#15A1BF] text-lg">↗</span></Button></Link>
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