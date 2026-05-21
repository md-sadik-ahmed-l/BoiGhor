"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { revalidatePath } from "next/cache";

export function CancelBooking({ myBooking }) {

    const { _id, user, roomName, status } = myBooking;


    const updatedBooking ={
        status: "Canceled",
    }

  const router = useRouter();
  

  
//   console.log(user)
  const handleDelete = async () => {

    const {data:tokenData}= await authClient.token()
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(updatedBooking),
    });

    const data = await res.json();

    if (data.modifiedCount  > 0) {
     router.push("/my-bookings");
     toast.success("Room canceled successfully")
    }
    return data;
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger className="group flex items-center  rounded-md shadow-xs select-none hover:bg-surface-secondary">
        <div className="flex  px-8 py-3 shrink-0 items-center justify-center  bg-danger-soft text-danger-soft-foreground hover:bg-red-500 hover:text-white rounded-md">
          <TrashBin className="size-6" />
          <p className="text-xl font-semibold pt-2">Cancel</p>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <TrashBin className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Cancel this item?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>{roomName} is permanent Canceled?</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Confirm Canceled
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}