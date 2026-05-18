"use client";

import { useState } from "react";

const amenitiesList = [
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomPage = () => {
   


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
    <div className="min-h-screen bg-[#151515] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-[#1d1d1d] border border-gray-700 rounded-2xl p-8 md:p-10 shadow-xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Add a new room</h1>
          <p className="text-gray-400 mt-2 text-lg">
            Fill in the details to list your study room on StudyNook
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Room + Floor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Room name *
              </label>
              <input
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
                type="text"
                placeholder="e.g. 3rd Floor"
                className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description *
            </label>

            <textarea
              rows={5}
              placeholder="Describe your room — size, environment, what makes it great..."
              className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-violet-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Image URL *
            </label>

            <input
              type="text"
              placeholder="https://example.com/room-photo.jpg"
              className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          {/* Capacity + Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Seat capacity *
              </label>

              <input
                type="number"
                placeholder="e.g. 4"
                className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Hourly rate ($) *
              </label>

              <input
                type="number"
                defaultValue={4}
                className="w-full bg-[#232323] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block mb-4 text-sm font-medium">
              Amenities
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map((item) => {
                const active = selectedAmenities.includes(item);

                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`border rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-200 ${
                      active
                        ? "bg-[#e9e7ff] text-violet-700 border-violet-400"
                        : "bg-[#232323] text-gray-300 border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <input
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

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 bg-[#232323] hover:bg-[#2a2a2a] border border-gray-700 rounded-xl px-6 py-3 text-lg font-medium transition-all"
          >
            + Add room
          </button>
        </form>
      </div>
    </div>
  );

};

export default AddRoomPage;