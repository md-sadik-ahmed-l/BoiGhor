

// import BookingCard from "@/components/BookingCard";
// import { DeleteDestination } from "@/components/DeleteDestination";
// import { EditModal } from "@/components/EditModal";
// import { auth } from "@/lib/auth";
// import { ArrowRight } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

const RoomsDetailsPage = async ({ params }) => {
  const { id } = await params;

//   const {token} = await auth.api.getToken({
//     headers: await headers()
//   })

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-rooms/${id}`, 
//     {
//     headers:{
//       authorization: `Bearer ${token}`
//     }
//   }
);
  const roomDetails = await res.json();

  return (
    <div className="">
      <div className=" max-w-7xl mx-auto my-15">
        <div className="mb-4 flex justify-end items-center gap-5">
          {/* <EditModal roomDetails={roomDetails}></EditModal> */}
          {/* <DeleteDestination roomDetails={roomDetails}></DeleteDestination> */}
        </div>

        <div className="relative w-full h-150">
          <Image
            alt={roomDetails.roomName}
            src={roomDetails.image}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex justify-between ">
          <div className="space-y-10 my-10">
            <div className="space-y-2">
              <h3 className="flex items-center text-2xl">
                <MdLocationOn></MdLocationOn>
                {roomDetails.floor}
              </h3>

              <div className="flex justify-between ">
                <h1 className="text-5xl font-bold">
                  {roomDetails.roomName}
                </h1>
              </div>

              <h4 className="flex items-center  gap-4">
              
                <span className="text-2xl">Capacity: {roomDetails.capacity}</span>
              </h4>
            </div>
            <div>
              <p className="text-3xl font-medium">Overview</p>
              <h5 className="text-xl">{roomDetails.description}</h5>

              
            </div>
          </div>

         {/* <BookingCard roomDetails={roomDetails}></BookingCard> */}

        </div>
      </div>
    </div>
  );
};

export default RoomsDetailsPage;