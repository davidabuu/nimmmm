"use client";
import React, { useState } from "react";
import Image from "next/image";
import ChangePassword from "./ChangePassword";
import { FaBell } from "react-icons/fa";

const AdminProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePicture(imageURL);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className=" w-full ">
      <div className="hidden md:flex float-right mr-3  mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-70 transition duration-300">
        <FaBell size={20} />
      </div>

      <div className="min-h-screen bg-[#F5F7FA] md:mt-8 p-4 md:p-8">
        <div className="bg-white p-4 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Profile</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <Image
                  src={profilePicture || "/nnpc.png"} // Placeholder for profile picture
                  alt="Profile Picture"
                  className="w-full h-full object-cover shadow-md"
                  width={160}
                  height={160}
                />
                <label
                  htmlFor="fileUpload"
                  className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-75 text-white text-sm text-center py-2 cursor-pointer "
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <p className="text-sm text-gray-500">
                Image size should be under 1MB and the aspect ratio needs to be
                1:1.
              </p>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Membership Number
                  </label>
                  <input
                    type="text"
                    placeholder="Membership Number"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Year of Induction
                  </label>
                  <input
                    type="text"
                    placeholder="Year of Induction"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Gender
                  </label>
                  <input
                    type="text"
                    placeholder="Gender"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* State of Origin */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    State of Origin
                  </label>
                  <input
                    type="text"
                    placeholder="State of Origin"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">LGA</label>
                  <input
                    type="text"
                    placeholder="LGA"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Membership Cadre */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Membership Cadre
                  </label>
                  <input
                    type="text"
                    placeholder="Membership Cadre"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">
                    Branch/Chapter
                  </label>
                  <input
                    type="text"
                    placeholder="Branch/Chapter"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col mt-6">
                <label className="text-gray-700 font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="lg:col-span-2 flex justify-start mt-6">
                <button
                  type="submit"
                  className=" bg-primary text-white px-4 py-2  hover:bg-blue-800 transition"
                >
                  Save changes
                </button>
              </div>
              <ChangePassword />
            </div>

            {/* Save Changes Button */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
