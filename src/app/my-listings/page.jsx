import LibraryCard from '@/components/Library/LibraryCard';
import { auth } from '@/lib/auth';
// import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "BoiGhor || My Listing",
};


const MyListingsPage = async() => {

    const session = auth.api.getSession({
        headers: await headers(),
    })

    const user = session?.user;
    console.log(user)

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings/user/${user?.id}`)
    const myListings = await res.json();

    return (
        <div>
            <div>
                {
                    myListings.map(roomData => <LibraryCard key={roomData._id} roomData={roomData}></LibraryCard>)
                }
            </div>
        </div>
    );
};

export default MyListingsPage;