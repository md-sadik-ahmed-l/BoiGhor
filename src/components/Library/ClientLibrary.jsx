"use client";

import React from 'react';
import { useEffect, useState } from "react";
import LibraryCard from './LibraryCard';



const amenitiesList = [
  "Wi-Fi",
  "Projector",
  "Whiteboard",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const floorList = ["1st Floor", "2nd Floor", "3rd Floor"];

const ClientLibrary = () => {

    const [roomsData, setRoomsData] = useState([]);

  const [searchText, setSearchText] = useState("");
  
  const [sortOption, setSortOption] = useState("latest");

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [selectedFloors, setSelectedFloors] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchRooms = async () => {
    try {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (sortOption !== "latest") {
        params.append("sort", sortOption);
      }

      if (selectedAmenities.length > 0) {
        params.append("amenities", selectedAmenities.join(","));
      }

      if (selectedFloors.length > 0) {
        params.append("floors", selectedFloors.join(","));
      }

      if (minPrice) {
        params.append("minPrice", minPrice);
      }

      if (maxPrice) {
        params.append("maxPrice", maxPrice);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-rooms?${params.toString()}`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();

      setRoomsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRooms();
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [
    searchText,
    sortOption,
    selectedAmenities,
    selectedFloors,
    minPrice,
    maxPrice,
  ]);

  const handleAmenityChange = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleFloorChange = (floor) => {
    setSelectedFloors((prev) =>
      prev.includes(floor) ? prev.filter((i) => i !== floor) : [...prev, floor],
    );
  };

    return (
        <div className="max-w-7xl mx-auto px-4">
      <div className="py-5">
        <h1 className="text-5xl font-bold text-indigo-900 mb-6">
          Browse study rooms
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <input
            type="text"
            placeholder="Search room..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-[500px] bg-zinc-900 text-white px-5 py-4 rounded-xl outline-none border border-zinc-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className=" sm:flex flex-col lg:col-span-3 bg-zinc-900 text-white mb-10 p-6 rounded-2xl h-fit">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>

            <div className="space-y-2.5">
              {amenitiesList.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(item)}
                    onChange={() => handleAmenityChange(item)}
                    className="w-4 h-4"
                  />

                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-700 my-4"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Hourly rate ($)</h2>

            <div className="flex gap-3">
              <input
                type="number"
                placeholder="2"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none"
              />

              <input
                type="number"
                placeholder="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="border-t border-zinc-700 my-6"></div>

          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Floor</h2>

            <div className="space-y-3">
              {floorList.map((floor) => (
                <label
                  key={floor}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedFloors.includes(floor)}
                    onChange={() => handleFloorChange(floor)}
                    className="w-4 h-4"
                  />

                  {floor}
                </label>
              ))}
            </div>
          </div>

          {/* <button
            onClick={fetchRooms}
            className="w-full mt-6 border border-zinc-600 rounded-xl py-4 hover:bg-zinc-800 transition"
          >
            Apply filters
          </button> */}
        </div>

        <div className="lg:col-span-9 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-4">
            <h2 className="text-2xl font-semibold">
              Showing {roomsData.length} rooms
            </h2>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-zinc-900 text-white border border-zinc-700 px-5 py-4 rounded-xl outline-none"
            >
              <option value="latest">Sort: Latest</option>

              <option value="low">Low to High Price</option>

              <option value="high">High to Low Price</option>
            </select>
          </div>

          {roomsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:gap-6 gap-4">
              {roomsData.map((roomData) => (
                <LibraryCard key={roomData._id} roomData={roomData} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <h2 className="text-2xl font-semibold text-zinc-500">
                No rooms found
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
    );
};

export default ClientLibrary;