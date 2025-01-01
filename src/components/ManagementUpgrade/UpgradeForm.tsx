import React from "react";

export default function UpgradeForm() {
  return (
    <div className="">
      <div className=" bg-white ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Membership Upgrade Form
        </h2>
        <form className="space-y-6">
          {/* Row 1: Membership Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Membership Number
              </label>
              <input
                type="text"
                placeholder="Enter membership number"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 2: Current Grade, Expected Grade, Date Elected, Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Current Grade
              </label>
              <select className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select...</option>
                <option>Grade 1</option>
                <option>Grade 2</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Expected New Grade
              </label>
              <select className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select...</option>
                <option>Grade A</option>
                <option>Grade B</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date Elected
              </label>
              <input
                type="date"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 3: Surname, Other Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Surname
              </label>
              <input
                type="text"
                placeholder="Enter Surname"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Other Names
              </label>
              <input
                type="text"
                placeholder="Enter Other Names"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 4: Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Postal/Contact Address
            </label>
            <textarea
              rows={3}
              placeholder="Enter your address"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Row 5: Telephone, Mobile Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Telephone
              </label>
              <input
                type="text"
                placeholder="Enter Telephone"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mobile Phone
              </label>
              <input
                type="text"
                placeholder="Enter Mobile Phone"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 6: Email, Profession */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Profession (e.g. Engineering, law, teaching, etc.)
              </label>
              <input
                type="text"
                placeholder="Enter Profession"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
