
'use client'
import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "@gravity-ui/icons";
import { Button, DateField, Label } from "@heroui/react";
import React, { useState } from "react";

const BookingRoomCard = ({ roomDetails }) => {
    const {_id, roomName, price, imageUrl, country} = roomDetails;

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [departureData, setDepartureData] = useState(null);

    const handleBooking = async() => {
        if (!user) {
            alert("Please login first!");
            return;
        }

        const bookingData = {
            userId: user.id,
            
            userName: user.name,
            roomDetails: _id,
            roomName,
            price,
            imageUrl,
            country,
            departureData: departureData ? new Date(departureData) : null
        }

        const {data:tokenData}= await authClient.token()

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
            method: 'POST',
            headers: { 
                "content-type": 'application/json' ,
                authorization: `Bearer ${tokenData?.token}`

            },
            body: JSON.stringify(bookingData),
        })
        const data = await res.json();
        // console.log(data); // MongoDB insertedId দেখাবে
    }

    return (
        <div className="flex flex-col mt-15 w-80 border border-[#e6e4e4] px-5 space-y-7 py-10 bg-base-200 rounded-md shadow-md hover:shadow-xl">
            <div className="space-y-1">
                <p>Starting from</p>
                <h4><span className="text-4xl text-cyan-500">${price}</span></h4>
                <h4>per person</h4>
            </div>
            <div>
                <DateField onChange={setDepartureData} className="w-[256px]" name="date">
                    <Label>Departure Date</Label>
                    <DateField.Group>
                        <DateField.Input>
                            {(segment) => <DateField.Segment segment={segment} />}
                        </DateField.Input>
                    </DateField.Group>
                </DateField>
            </div>
            <div>
                <Button 
                    onClick={handleBooking} 
                    isDisabled={isPending || !user}
                    className="text-white bg-cyan-500 rounded-none w-full font-bold"
                >
                    {isPending ? "Loading..." : "Book Now"} <ArrowRight />
                </Button>
            </div>
        </div>
    );
};

export default BookingRoomCard;