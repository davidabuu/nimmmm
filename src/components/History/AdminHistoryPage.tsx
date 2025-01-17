import React from "react";
import Image from "next/image"; // Using Image from Next.js for optimization
import Box from "../Box";

const AdminHistoryPage = () => {
  return (
    <div className="p-6 m-2 md:m-6 ">
      <div className="bg-white p-6 flex items-center    rounded-lg shadow-md">
        {/* Profile Picture */}
        <div className="w-16 h-16">
          <Image
            src="/img.png" // Replace with the path to your image
            alt="Profile Picture"
            className="rounded-full "
            width={64}
            height={64}
          />
        </div>

        {/* User Info */}
        <div className="text-secondary ml-2">
          <h1 className="text-lg font-semibold">Victor Ade</h1>
          <p className="text-sm text-gray-500">ID: 123456</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <Box
          imageSrc="/Frame1.png"
          title="Fellow"
          description="Membership Grade"
       
        />
        <Box
          imageSrc="/Frame2.png"
          title="Associate"
          description="Membership Grade"
      
        />
        <Box
          imageSrc="/Frame3.png"
          title="Member"
          description="Membership Grade"
        
        />
      </div>
      <div className="overflow-x-auto mt-6 bg-white">
        <h1 className=" p-4 font-medium text-lg text-secondary">
          Outstanding Payment
        </h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className=" text-left">
              <th className="p-4"></th>
              <th className="p-4 whitespace-nowrap text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="p-4 whitespace-nowrap text-sm font-medium text-gray-500">
                Description
              </th>
              <th className="p-4 whitespace-nowrap text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="p-4 whitespace-nowrap text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {Array(4)
              .fill("")
              .map((_, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="p-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                    16/09/2024
                  </td>
                  <td className="p-4 whitespace-nowrap font-medium">
                    Annual Membership Subscription
                  </td>
                  <td className="p-4 whitespace-nowrap text-red-500">
                    ₦20,000.00
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <a href="/payment-gateway">
                      <button className="bg-primary text-white px-4 py-2  hover:bg-blue-800 transition">
                        Proceed to Payment
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHistoryPage;
