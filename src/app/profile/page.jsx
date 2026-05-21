"use client";
import UpdateUserModal from "@/components/UpdatedUserModal";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";
import React from "react";

const UserProfile = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  console.log("user", user);
  return (
    <div className=" bg-gray-50 flex items-center justify-center px-3 py-10">
      
      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative rounded-full overflow-hidden border-4 border-white shadow-md">
            <Avatar className="h-32 w-32">
              <Avatar.Image
                alt="John Doe"
                src={user?.image}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
            </Avatar>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.name}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>

            
            <UpdateUserModal></UpdateUserModal>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-50">
              <span className="w-40 text-sm font-bold text-gray-900">Name</span>
              <span className="text-gray-600">{user?.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-50">
              <span className="w-40 text-sm font-bold text-gray-900">
                Email
              </span>
              <span className="text-gray-600">{user?.email}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center py-2">
              <span className="w-40 text-sm font-bold text-gray-900">
                Member Since
              </span>
              <span className="text-gray-600">May 10, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
