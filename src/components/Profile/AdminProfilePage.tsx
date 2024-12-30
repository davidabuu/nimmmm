"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ChangePassword from "./ChangePassword";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css"; 
import Skeleton from "react-loading-skeleton"; // Add skeleton loader package if not installed
import { RootState, AppDispatch } from "@/src/lib/store";
import { fetchProfile } from "@/src/redux/auth/profile";

const AdminProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector(
    (state: RootState) => state.fetchProfile
  );

  const [formData, setFormData] = useState({
    fullName: "",
    membershipNumber: "",
    email: "",
    yearOfInduction: "",
    gender: "",
    dateOfBirth: "",
    stateOfOrigin: "",
    lga: "",
    membershipCadre: "",
    branch: "",
    address: "",
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Fetch profile data on mount
  useEffect(() => {
    dispatch(fetchProfile()); // Replace with actual token
  }, [dispatch]);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.name,
        membershipNumber: profile.id, // Adjust based on actual fields
        email: profile.email,
        yearOfInduction: "", // Populate from profile if available
        gender: "",
        dateOfBirth: "",
        stateOfOrigin: "",
        lga: "",
        membershipCadre: "",
        branch: "",
        address: "",
      });
      setProfilePicture(profile.avatar || null);
    }
  }, [profile]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full">
      <div className="hidden md:flex float-right mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-70 transition duration-300">
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
                {loading ? (
                  <Skeleton
                    circle
                    height={160}
                    width={160}
                  />
                ) : (
                  <Image
                    src={profilePicture || "/nnpc.png"} // Placeholder for profile picture
                    alt="Profile Picture"
                    className="w-full h-full object-cover shadow-md"
                    width={160}
                    height={160}
                  />
                )}
                <label
                  htmlFor="fileUpload"
                  className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-75 text-white text-sm text-center py-2 cursor-pointer"
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
                {[
                  { label: "Full Name", name: "fullName", type: "text" },
                  {
                    label: "Membership Number",
                    name: "membershipNumber",
                    type: "text",
                  },
                  { label: "Email Address", name: "email", type: "email" },
                  {
                    label: "Year of Induction",
                    name: "yearOfInduction",
                    type: "text",
                  },
                  { label: "Gender", name: "gender", type: "text" },
                  { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                  {
                    label: "State of Origin",
                    name: "stateOfOrigin",
                    type: "text",
                  },
                  { label: "LGA", name: "lga", type: "text" },
                  {
                    label: "Membership Cadre",
                    name: "membershipCadre",
                    type: "text",
                  },
                  { label: "Branch/Chapter", name: "branch", type: "text" },
                ].map(({ label, name, type }, idx) => (
                  <div
                    className="flex flex-col"
                    key={idx}
                  >
                    <label className="text-gray-700 font-medium mb-1">
                      {label}
                    </label>
                    {loading ? (
                      <Skeleton height={40} />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={formData[name as keyof typeof formData] || ""}
                        onChange={handleInputChange}
                        placeholder={label}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="flex flex-col mt-6">
                <label className="text-gray-700 font-medium mb-1">
                  Address
                </label>
                {loading ? (
                  <Skeleton height={40} />
                ) : (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Save Changes Button */}
              <div className="lg:col-span-2 flex justify-start mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-4 py-2 hover:bg-blue-800 transition"
                >
                  {loading ? "Loading..." : "Save changes"}
                </button>
              </div>
              <ChangePassword />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
