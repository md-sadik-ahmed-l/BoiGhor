"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import {
  Button,
  Checkbox,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
  useOverlayState,
} from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const amenitiesList = [
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export function EditModal({ roomDetails }) {
  const state = useOverlayState();

  const {
    _id,
    roomName,
    floor,
    description,
    image,
    capacity,
    hourlyRate,
    amenities = [],
  } = roomDetails;

  const [selectedAmenities, setSelectedAmenities] =
    useState(amenities);

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(
        selectedAmenities.filter((a) => a !== item)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedRoom = {
      roomName: formData.get("roomName"),
      floor: formData.get("floor"),
      description: formData.get("description"),
      image: formData.get("image"),
      capacity: Number(formData.get("capacity")),
      hourlyRate: Number(formData.get("hourlyRate")),
      amenities: selectedAmenities,
    };

    // console.log(updatedRoom);

    
    

    try {

     const {data:tokenData}= await authClient.token()

     
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      const data = await res.json();

      if (data.modifiedCount) {
        state.close();
      }

      toast.success("Your Room update success full")

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Modal */}
      <Modal state={state}>
        
        <Modal.Trigger className="flex justify-end py-4 px-5 hover:bg-[#4b4a4a]  bg-[#313030] border rounded-md">
          <div className=" flex rounded-none   text-xl">
            <Pencil className="w-6 h-6" />
            Edit Room
          </div>
        </Modal.Trigger>

        <Modal.Backdrop >

        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-4xl bg-[#1f1f1f] text-white border border-gray-700 rounded-3xl">
            <Modal.CloseTrigger />

            <Modal.Header className="pb-0">
              <div>
                <Modal.Heading className="text-4xl font-bold text-white">
                  Edit room
                </Modal.Heading>

                <p className="text-gray-400 mt-2">
                  Update your study room information
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface className="bg-transparent shadow-none">
                <form
                  onSubmit={onSubmit}
                  className="space-y-4"
                >
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                    <TextField
                      name="roomName"
                      defaultValue={roomName}
                      isRequired
                    >
                      <Label className="mb-2 text-white">
                        Room name *
                      </Label>

                      <Input
                        placeholder="e.g Silent Focus Room A"
                        className="rounded-xl"
                      />

                      <FieldError />
                    </TextField>

                    
                    <TextField
                      name="floor"
                      defaultValue={floor}
                      isRequired
                    >
                      <Label className="mb-2">
                        Floor *
                      </Label>

                      <Input
                        placeholder="e.g 3rd Floor"
                        className="rounded-xl"
                      />

                      <FieldError />
                    </TextField>

                   
                    <div className="md:col-span-2">
                      <TextField
                        name="description"
                        defaultValue={description}
                        isRequired
                      >
                        <Label className="mb-2 text-white">
                          Description *
                        </Label>

                        <TextArea
                          placeholder="Describe your room..."
                          className="rounded-xl min-h-[100px]"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    
                    <div className="md:col-span-2">
                      <TextField
                        name="image"
                        defaultValue={image}
                        isRequired
                      >
                        <Label className="mb-2 text-white">
                          Image URL *
                        </Label>

                        <Input
                          type="url"
                          placeholder="https://example.com/room.jpg"
                          className="rounded-xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    
                    <TextField
                      name="capacity"
                      defaultValue={capacity}
                      isRequired
                    >
                      <Label className="mb-2 text-white">
                        Seat capacity *
                      </Label>

                      <Input
                        type="number"
                        placeholder="e.g 4"
                        className="rounded-xl"
                      />

                      <FieldError />
                    </TextField>

                    
                    <TextField
                      name="hourlyRate"
                      defaultValue={hourlyRate}
                      isRequired
                    >
                      <Label className="mb-2 text-white">
                        Hourly rate ($) *
                      </Label>

                      <Input
                        type="number"
                        placeholder="e.g 5"
                        className="rounded-xl"
                      />

                      <FieldError />
                    </TextField>
                  </div>

                 
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">
                      Amenities
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {amenitiesList.map((item) => (
                        <label
                          key={item}
                          className={`border rounded-2xl px-5 py-3 flex items-center justify-between cursor-pointer transition-all ${
                            selectedAmenities.includes(item)
                              ? "bg-[#e7e3ff] text-[#4338ca] border-[#e7e3ff]"
                              : "border-gray-700 text-gray-300"
                          }`}
                        >
                          <Checkbox
                            isSelected={selectedAmenities.includes(
                              item
                            )}
                            onValueChange={() =>
                              toggleAmenity(item)
                            }
                          />

                          <span className="text-sm font-medium">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  
                  <Modal.Footer className="px-0">
                    <Button
                      type="submit"
                      className="rounded-xl px-6"
                    >
                      + Update room
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
         </Modal.Backdrop >
      </Modal>
    </>
  );
}