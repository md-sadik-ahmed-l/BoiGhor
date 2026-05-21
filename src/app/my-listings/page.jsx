import LibraryCard from "@/components/Library/LibraryCard";
import { auth } from "@/lib/auth";
// import { authClient } from '@/lib/auth-client';
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import { MdCalendarMonth } from "react-icons/md";

export const metadata = {
  title: "BoiGhor || My Listing",
};

const MyListingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // console.log(session)

  const user = session?.user;
  // console.log(user)

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings/user/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  // console.log(res)
  const myListings = await res.json();

  // console.log(myListings)

  return (
    <div className=" flex-1 bg-base-200">
      <div className="max-w-6xl mx-auto ">
        <h1 className="px-4 text-4xl py-15 font-bold ">My own house </h1>

        {myListings?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {myListings.map((roomData) => (
              <LibraryCard key={roomData._id} roomData={roomData}></LibraryCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-black justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <MdCalendarMonth className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              No Create yet
            </h3>
            <p className=" text-sm max-w-xs mb-8">
              You have create any rooms. Browse available rooms and make your
              first reservation.
            </p>
            <Link
              href="/add-room"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 tracking-wide uppercase"
            >
              Create Room
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;
