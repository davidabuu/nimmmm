'use client';

import { MembershipForm } from "@/src/redux/nimUpgrade/membershipSlice";
import React from "react";


interface UpgradeFormProps {
  formData: Partial<MembershipForm>;
  setFormData: (data: Partial<MembershipForm>) => void;
  errors: Record<string, string>;
}

export default function UpgradeForm({
  formData,
  setFormData,
  errors,
}: UpgradeFormProps) {
  const handleInputChange = (
    field: keyof MembershipForm,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Membership Upgrade Form
      </h2>
      <form className="space-y-6">
        {/* Row 1: Membership Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Membership Number *
            </label>
            <input
              type="text"
              value={formData.membership_number || ""}
              onChange={(e) =>
                handleInputChange("membership_number", e.target.value)
              }
              placeholder="Enter membership number"
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.membership_number ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.membership_number && (
              <p className="text-red-500 text-sm mt-1">{errors.membership_number}</p>
            )}
          </div>
        </div>

        {/* Row 2: Current Grade, Expected Grade, Date Elected, Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Current Grade *
            </label>
            <select
              value={formData.current_grade || ""}
              onChange={(e) =>
                handleInputChange("current_grade", e.target.value)
              }
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.current_grade ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select...</option>
              <option value="grade1">Grade 1</option>
              <option value="grade2">Grade 2</option>
            </select>
            {errors.current_grade && (
              <p className="text-red-500 text-sm mt-1">{errors.current_grade}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Expected New Grade *
            </label>
            <select
              value={formData.expected_new_grade || ""}
              onChange={(e) =>
                handleInputChange("expected_new_grade", e.target.value)
              }
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.expected_new_grade ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select...</option>
              <option value="gradeA">Grade A</option>
              <option value="gradeB">Grade B</option>
            </select>
            {errors.expected_new_grade && (
              <p className="text-red-500 text-sm mt-1">{errors.expected_new_grade}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date Elected
            </label>
            <input
              type="date"
              value={formData.date_elected || ""}
              onChange={(e) =>
                handleInputChange("date_elected", e.target.value)
              }
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Row 3: Surname, Other Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Surname *
            </label>
            <input
              type="text"
              value={formData.surname || ""}
              onChange={(e) => handleInputChange("surname", e.target.value)}
              placeholder="Enter Surname"
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.surname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.surname && (
              <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Other Names *
            </label>
            <input
              type="text"
              value={formData.othernames || ""}
              onChange={(e) =>
                handleInputChange("othernames", e.target.value)
              }
              placeholder="Enter Other Names"
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.othernames ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.othernames && (
              <p className="text-red-500 text-sm mt-1">{errors.othernames}</p>
            )}
          </div>
        </div>

        {/* Row 4: Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Current Postal/Contact Address
          </label>
          <textarea
            rows={3}
            value={formData.current_address || ""}
            onChange={(e) =>
              handleInputChange("current_address", e.target.value)
            }
            placeholder="Enter your address"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Row 5: Telephone, Mobile Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Telephone
            </label>
            <input
              type="text"
              value={formData.telephone || ""}
              onChange={(e) => handleInputChange("telephone", e.target.value)}
              placeholder="Enter Telephone"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Phone *
            </label>
            <input
              type="text"
              value={formData.mobile_phone || ""}
              onChange={(e) =>
                handleInputChange("mobile_phone", e.target.value)
              }
              placeholder="Enter Mobile Phone"
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.mobile_phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.mobile_phone && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile_phone}</p>
            )}
          </div>
        </div>

        {/* Row 6: Email, Profession */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email"
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profession (e.g. Engineering, law, teaching, etc.)
            </label>
            <input
              type="text"
              value={formData.profession || ""}
              onChange={(e) =>
                handleInputChange("profession", e.target.value)
              }
              placeholder="Enter Profession"
              className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.profession ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>
      </form>
    </div>
  );
}