"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";




const amenitiesList = [
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

import React from 'react';
import { toast } from "react-toastify";


const AddRoom = () => {

    const user = authClient.useSession()
    const router = useRouter();



    const handleAddRoom= async(e) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const roomsData = Object.fromEntries(formData.entries());

        roomsData.amenities = selectedAmenities;
        roomsData.user= user?.data?.session.userId;

        const {data:tokenData}= await authClient.token()
        

        const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(roomsData)
        })

        const data = await res.json()

        if (data.insertedId) {
          router.push("/library");

          toast.success("Created Room success fully")
        }
        

        console.log(data)

    }



  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(
        selectedAmenities.filter((amenity) => amenity !== item)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

    return (
        <div className=" bg-[#151515] text-white flex items-center justify-center px-4 py-7">

      <div className="w-full max-w-4xl bg-[#1d1d1d] p-3 border border-gray-700 rounded-2xl  md:p-10 shadow-xl">
      
        <div className="mb-5">
          <h1 className="text-4xl font-bold">Add a new room</h1>
          <p className="text-gray-400 mt-1 text-lg">
            Fill in the details to list your study room on StudyNook
          </p>
        </div>

       
        <form onSubmit={handleAddRoom} className="space-y-4">
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Room name *
              </label>
              <input
                required
                name="roomName"
                type="text"
                placeholder="e.g. Silent Focus Room A"
                className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Floor *
              </label>
              <input
              required
              name="floor"
                type="text"
                placeholder="e.g. 3rd Floor"
                className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description *
            </label>

            <textarea
            required
            name="description"
            minLength={3}
              rows={3}
              placeholder="Describe your room — size, environment, what makes it great..."
              className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-violet-500"
            />
          </div>

        
          <div>
            <label className="block mb-2 text-sm font-medium">
              Image URL *
            </label>

            <input
            required
                name="image"
              type="text"
              placeholder="https://example.com/room-photo.jpg"
              className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-2 outline-none focus:border-violet-500"
            />
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Seat capacity *
              </label>

              <input 
                name="capacity"
                required
                type="number"
                min={10}
                placeholder="e.g. 10"
                className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-2 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Hourly rate ($) *
              </label>

              <input
                name="hourlyRate"
                required
                min={4}
                type="number"
                defaultValue={4}
                className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-2 outline-none focus:border-violet-500"
              />
            </div>
          </div>

         
          <div>
            <label className="block mb-4 text-sm font-medium">
              Amenities
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {amenitiesList.map((item) => {
                const active = selectedAmenities.includes(item);

                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`border rounded-xl px-5 py-2 flex items-center justify-between transition-all duration-200 ${
                      active
                        ? "bg-[#e9e7ff] text-violet-700 border-violet-400"
                        : "bg-[#232323] text-gray-300 border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <input
                        name="amenities"
                      type="checkbox"
                      checked={active}
                      readOnly
                      className="accent-violet-600 w-4 h-4"
                    />

                    <span className="text-sm font-medium">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          
          <button
            type="submit"
            className="mt-2 bg-[#2b2929] hover:bg-[#4d4a4a] border border-gray-500 rounded-xl px-6 py-3 text-lg font-medium transition-all "
          >
            + Add room
          </button>
        </form>
      </div>
    </div>
    );
};

export default AddRoom;