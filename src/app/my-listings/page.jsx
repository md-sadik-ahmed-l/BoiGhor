import LibraryCard from '@/components/Library/LibraryCard';
import { auth } from '@/lib/auth';
// import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "BoiGhor || My Listing",
};


const MyListingsPage = async() => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    // console.log(session)

    const user = session?.user;
    // console.log(user)

    const {token} = await auth.api.getToken({
        headers: await headers()
      })
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings/user/${user?.id}`, {
        headers:{
              authorization: `Bearer ${token}`
            }
    })

    // console.log(res)
    const myListings = await res.json();

    // console.log(myListings)

    return (
        <div className='max-w-6xl mx-auto my-15'>
            <h1 className='text-4xl my-10 font-bold '>My own house </h1>
            <div className='grid grid-cols-3 gap-10 '>
                {
                    myListings.map(roomData => <LibraryCard key={roomData._id} roomData={roomData}></LibraryCard>)
                }
            </div>
        </div>
    );
};

export default MyListingsPage;