
import LibraryCard from "@/components/Library/LibraryCard";

export const metadata = {
  title: "BoiGhor || Library",
};

const LibraryPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-rooms`,
    {
      cache: "no-store",
    }
  );

  const roomsData = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      {/* Top Section */}
      <div className="py-5 sticky top-16 z-50 bg-white">
        <h1 className="text-5xl font-bold text-indigo-900 mb-6">
          Browse study rooms
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <input
            type="text"
            placeholder="Focus Room"
            className="w-full md:w-[500px] bg-zinc-900 text-white px-5 py-4 rounded-xl outline-none border border-zinc-800"
          />

          <button className="px-8 py-4 rounded-xl border border-zinc-300 text-zinc-500 hover:bg-zinc-100 transition">
            Search
          </button>
        </div>

        {/* <div className="flex flex-wrap items-center gap-3 mt-5 text-sm">
          <p className="text-zinc-500 font-medium">Active filters:</p>

          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            Wi‑Fi ×
          </div>

          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            Projector ×
          </div>

          <button className="text-red-500 font-medium">Clear all</button>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 sticky top-59 z-49  bg-zinc-900 text-white mb-10 p-6 rounded-2xl h-fit">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>

            <div className="space-y-2.5">
              {[
                "Wi‑Fi",
                "Projector",
                "Whiteboard",
                "Power Outlets",
                "Quiet Zone",
                "Air Conditioning",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <input type="checkbox" className="w-4 h-4" />
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
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none"
              />

              <input
                type="number"
                placeholder="20"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="border-t border-zinc-700 my-6"></div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Floor</h2>

            <div className="space-y-3">
              {["1st Floor", "2nd Floor", "3rd Floor"].map((floor) => (
                <label
                  key={floor}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <input type="checkbox" className="w-4 h-4" />
                  {floor}
                </label>
              ))}
            </div>
          </div>

          <button className="w-full mt-6 border border-zinc-600 rounded-xl py-4 hover:bg-zinc-800 transition">
            Apply filters
          </button>
        </div>

        {/* Cards Section */}
        <div className="lg:col-span-9 mb-10">
          <div className="flex flex-col sticky top-58 z-49 bg-white md:flex-row md:items-center md:justify-between gap-5 pb-4">
            <h2 className="text-2xl font-semibold">
              Showing {roomsData.length} rooms
            </h2>

            <select className="bg-zinc-900 text-white border border-zinc-700 px-5 py-4 rounded-xl outline-none">
              <option>Sort: Latest</option>
              <option>Low to High Price</option>
              <option>High to Low Price</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {roomsData.map((roomData) => (
              <LibraryCard
                key={roomData._id}
                roomData={roomData}
              ></LibraryCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
