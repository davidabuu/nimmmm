"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useDispatch, useSelector } from "react-redux";

import ChangePassword from "./ChangePassword";
import { RootState, AppDispatch } from "@/src/lib/store";
import { fetchProfile } from "@/src/redux/auth/profile";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
    membershipCadre: "",
    branch: "",
    address: "",
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  /** ===========================
   * FETCH PROFILE
   ============================ */
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  /** ===========================
   * MAP PROFILE DATA CORRECTLY
   ============================ */
  useEffect(() => {
    if (profile?.data) {
      const member = profile.data.member;

      setFormData({
        fullName: `${member.first_name} ${member.last_name} ${member.other_name || ""}`,
        membershipNumber: member.member_no,
        email: profile.data.email,
        yearOfInduction: member.date_of_election?.split("T")[0] || "",
        gender: member.gender || "",
        dateOfBirth: member.date_of_birth?.split("T")[0] || "",
        stateOfOrigin: member.state_of_residence || "",
        membershipCadre: member.grade || "",
        branch: member.chapter?.name || "",
        address: member.address || "",
      });

      setProfilePicture(profile.data.image || null);
    }
  }, [profile]);

  /** ===========================
   * IMAGE UPLOAD HANDLER
   ============================ */
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Authentication required");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      await axios.post(`${BASE_URL}/account/image`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Refresh profile after successful upload
      window.location.reload();
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  /** ===========================
   * FORM HANDLER (OPTIONAL)
   ============================ */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full">
     

      <div className="min-h-screen bg-[#F5F7FA] md:mt-8 p-4 md:p-8">
        <div className="bg-white p-4 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Profile</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* PROFILE IMAGE */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                {loading ? (
                  <Skeleton circle height={160} width={160} />
                ) : (
                  <Image
                    src={profilePicture || "/nnpc.png"}
                    alt="Profile Picture"
                    fill
                    className="object-cover rounded shadow"
                  />
                )}

                <label
                  htmlFor="fileUpload"
                  className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 text-white text-sm text-center py-2 cursor-pointer"
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </label>

                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
              </div>

              <p className="text-sm text-gray-500">
                Max size 1MB. Ratio 1:1
              </p>
            </div>

            {/* FORM FIELDS */}
            <div>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>

                    {loading ? (
                      <Skeleton height={40} />
                    ) : (
                      <input
                        type={key.includes("date") ? "date" : "text"}
                        value={value}
                        disabled
                        className="w-full p-2 border rounded bg-gray-100"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled
                  className="bg-primary text-white px-4 py-2 opacity-60 cursor-not-allowed"
                >
                  Save changes
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
