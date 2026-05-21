"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { revalidatePath } from "next/cache";

export function DeleteRoom({ roomDetails }) {
  const router = useRouter();
  const { _id, user, roomName } = roomDetails;
  console.log(user);
  const handleDelete = async () => {

    const {data:tokenData}= await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`,
      {
        method: "DELETE",
        headers: {
          "contain-type": "application/json",

          authorization: `Bearer ${tokenData?.token}`,
        },
      },
    );

    const data = await res.json();

    if (data.deletedCount > 0) {
      router.push("/my-listings");
      toast.success("Room deleted successfully");
    }
    return data;
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger className="group flex items-center  border  rounded-md shadow-xs select-none hover:bg-surface-secondary">
        <div className="flex  px-8 py-3 shrink-0 items-center justify-center  bg-danger-soft text-danger-soft-foreground hover:bg-red-500 hover:text-white rounded-md">
          <TrashBin className="size-6" />
          <p className="text-xl font-semibold pt-2">Delete</p>
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
              <AlertDialog.Heading>Delete this item?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>{roomName} is permanent deleted?</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Confirm Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
