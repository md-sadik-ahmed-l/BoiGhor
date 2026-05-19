import LibraryCard from '@/components/Library/LibraryCard';
import React from 'react';

const LibraryPage = async() => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-rooms`);
    const roomsData = await res.json();

    return (
        <div className='max-w-6xl mx-auto my-15'>
            <h1 className='text-4xl my-10 font-bold '>Destinations</h1>
            <div className='grid grid-cols-3 gap-10 '>
                {
                    roomsData.map(roomData =><LibraryCard key={roomData._id} roomData={roomData}></LibraryCard> )
                }
            </div>

        </div>
    );
};

export default LibraryPage;

