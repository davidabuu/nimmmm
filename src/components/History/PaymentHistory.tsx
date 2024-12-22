// imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "react-loading-skeleton/dist/skeleton.css";

import { getHistoryPayments } from "@/src/redux/payment/historyPayment";
import { fetchAccountInfo } from "@/src/redux/auth/fetchAccountInfo";
import TableSkeleton from "../Dashboard/TableSkeleton";
import { AppDispatch, RootState } from "@/src/lib/store";



const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const dispatch = useDispatch<AppDispatch>();
  const { loading: accountLoading } = useSelector(
    (state: RootState) => state.fetchAccountInfo
  );

  // Access payment history and loading state from Redux
  const { data: paymentData, loading } = useSelector(
    (state: RootState) => state.getHistoryPayments
  );

  useEffect(() => {
    dispatch(fetchAccountInfo()).then((action) => {
      if (fetchAccountInfo.fulfilled.match(action)) {
        const membershipId = action.payload.data?.membershipId;
        if (membershipId) {
          dispatch(getHistoryPayments(membershipId));
        }
      }
    });
  }, [dispatch]);

  

  return (
    <div>
      <h2 className="text-xl bg-white font-semibold px-4 py-2 ">
        Payments History
      </h2>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white">
        {/* Search */}
        <div className="flex items-center justify-start space-x-2">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Sort By */}
        <div className="flex items-center mt-2 md:mt-0 space-x-2">
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        {loading || accountLoading ? (
          <TableSkeleton rows={4} cols={5} />
        ) : (
          <table className="min-w-full bg-white table-auto border-collapse">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="p-4 whitespace-nowrap text-left">Date Paid</th>
                <th className="p-4 whitespace-nowrap text-left">Description</th>
                <th className="p-4 whitespace-nowrap text-left">Amount</th>
                <th className="p-4 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {paymentData?.payments?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 whitespace-nowrap">{item.date}</td>
                  <td className="p-4 whitespace-nowrap">{item.description}</td>
                  <td className="p-4 whitespace-nowrap text-green-500">
                    {item.amount}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <button className="bg-primary text-white px-4 py-2 hover:bg-blue-800 transition">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 text-gray-500 border">1</button>
        <button className="px-4 py-2 text-gray-500 border">2</button>
        <button className="px-4 py-2 text-gray-500 border">Next</button>
      </div>
    </div>
  );
};

export default PaymentHistory;
