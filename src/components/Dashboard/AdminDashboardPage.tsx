// imports
import React, { useEffect } from "react";
import Image from "next/image"; // Using Image from Next.js for optimization
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton styles
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store";
import { fetchAccountInfo } from "@/src/redux/auth/fetchAccountInfo";
import Box from "../Box";
import { getOutstandingPayments } from "@/src/redux/payment/outstandingPayment";
import TableSkeleton from "./TableSkeleton";
 // Import TableSkeleton

const AdminDashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access accountInfo and loading state from Redux
  const { loading: accountLoading, accountInfo } = useSelector(
    (state: RootState) => state.fetchAccountInfo
  );

  // Access outstanding payments state from Redux
  const { data: outstandingPayments, loading: paymentsLoading } = useSelector(
    (state: RootState) => state.getOutstandingPayments
  );

  // Fetch accountInfo and outstanding payments data on component mount
  useEffect(() => {
    dispatch(fetchAccountInfo()).then((action) => {
      if (fetchAccountInfo.fulfilled.match(action)) {
        const membershipId = action.payload.data?.membershipId;
        if (membershipId) {
          dispatch(getOutstandingPayments(membershipId));
        }
      }
    });
  }, [dispatch]);

  return (
    <div className="p-6 m-2 md:m-6">
      {/* accountInfo Profile Section */}
      <div className="bg-white p-6 flex items-center rounded-lg shadow-md">
        {/* Profile Picture */}
        <div className="w-16 h-16">
          <Image
            src="/img.png" // Replace with the path to your image
            alt="Profile Picture"
            className="rounded-full"
            width={64}
            height={64}
          />
        </div>

        {/* accountInfo Info */}
        <div className="text-secondary ml-2">
          {accountLoading ? (
            <>
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={15} className="mt-1" />
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold">{accountInfo?.name || "N/A"}</h1>
              <p className="text-sm text-gray-500">ID: {accountInfo?.membershipId || "N/A"}</p>
            </>
          )}
        </div>
      </div>

      {/* Membership Grades Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <Box
          imageSrc="/Frame1.png"
          title="Fellow"
          description="Membership Grade"
          link="/membership"
        />
        <Box
          imageSrc="/Frame2.png"
          title="Associate"
          description="Membership Grade"
          link="/membership"
        />
        <Box
          imageSrc="/Frame3.png"
          title="Member"
          description="Membership Grade"
          link="/membership"
        />
      </div>

      {/* Outstanding Payments Section */}
      <div className="overflow-x-auto mt-6 bg-white">
        <h1 className="p-4 font-medium text-lg text-secondary">
          Outstanding Payment
        </h1>
        {paymentsLoading || accountLoading ? (
          <TableSkeleton rows={4} cols={5} /> // Use TableSkeleton while loading
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left">
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
            {outstandingPayments?.payments?.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="p-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.dueDate}
                  </td>
                  <td className="p-4 whitespace-nowrap font-medium">
                    {payment.description || "N/A"}
                  </td>
                  <td className="p-4 whitespace-nowrap text-red-500">
                    ₦{payment.amount.toLocaleString()}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <a href="/payment-gateway">
                      <button className="bg-primary text-white px-4 py-2 hover:bg-blue-800 transition">
                        Proceed to Payment
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
