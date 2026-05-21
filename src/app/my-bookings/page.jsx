import MyBookingCard from "@/components/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { MdCalendarMonth } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";

export const metadata = {
  title: "BoiGhor || Bookings",
};

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/user/${user?.id}`,
    { headers: { authorization: `Bearer ${token}` } },
  );
  const myBookingData = await res.json();

  const statusOrder = {
    Confirmed: 1,
    Canceled: 3,
  };

  const sortedBookings = [...myBookingData].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status],
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="mb-12 ">
          <div className="">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-bold">
                Rooms
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-white mb-3">
              My Bookings
            </h1>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white/40 text-base">
              All rooms you have booked — manage and cancel from here
            </p>

            <div>
              {myBookingData?.length > 0 && (
                <div className="mt-5 mr-5 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <MdCalendarMonth className="text-amber-400 text-base" />
                  <span className="text-sm text-white/60">
                    <span className="text-white text-xl font-bold">
                      {myBookingData.length}
                    </span>{" "}
                    active booking{myBookingData.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {myBookingData?.length > 0 ? (
          <div className="space-y-5">
            {sortedBookings.map((myBooking) => (
              <MyBookingCard key={myBooking._id} myBooking={myBooking} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <MdCalendarMonth className="text-white/20 text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-white/60 mb-2">
              No bookings yet
            </h3>
            <p className="text-white/30 text-sm max-w-xs mb-8">
              You haven't booked any rooms. Browse available rooms and make your
              first reservation.
            </p>
            <Link href="/library"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 tracking-wide uppercase"
            >
              
              Browse Rooms</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
