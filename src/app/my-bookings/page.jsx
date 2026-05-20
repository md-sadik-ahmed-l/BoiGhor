import MyBookingCard from '@/components/MyBookingCard';
import React from 'react';

const MyBookingsPage = async() => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`);
    const myBookingData = await res.json();
    console.log(myBookingData)
    return (
        <div className='max-w-6xl mx-auto mt-15'>
            <div className='my-5'>
                <h1 className='text-3xl font-bold'>My bookings</h1>
                <p>All rooms you have booked — manage and cancel from here</p>
            </div>
            <div className='space-y-10'>
                {/* <div className='flex justify-between px-10'>
                    <h1>Room</h1>
                    <h1>Name</h1>
                    <h1>Date</h1>
                    <h1>Time</h1>
                    <h1>Price</h1>
                    <h1>Status</h1>
                    <h1>Action</h1>
                </div> */}
                {
                  myBookingData.map(myBooking => <MyBookingCard key={myBooking._id} myBooking={myBooking}></MyBookingCard>)  
                }
            </div>
        </div>
    );
};

export default MyBookingsPage;