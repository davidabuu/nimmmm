import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { getHistoryPayments } from "@/src/redux/payment/historyPayment";
import TableSkeleton from "../Dashboard/TableSkeleton";
import { AppDispatch, RootState } from "@/src/lib/store";

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch<AppDispatch>();
  const { loading: accountLoading } = useSelector(
    (state: RootState) => state.fetchAccountInfo
  );

  // Access payment history and loading state from Redux
  const { data: paymentData, loading } = useSelector(
    (state: RootState) => state.getHistoryPayments
  );

  useEffect(() => {
    dispatch(getHistoryPayments());
  }, [dispatch]);

  // Filtered and sorted data
  const filteredData = Array.isArray(paymentData)
    ? paymentData
        .filter((item) =>
          item.billName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (sortBy === "latest") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }
        })
    : [];

  // Paginated data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
              {paginatedData.map(
                (
                  item: { date: string; billName: string; amount: number },
                  index
                ) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 whitespace-nowrap">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(item.date))}
                    </td>
                    <td className="p-4 whitespace-nowrap">{item.billName}</td>
                    <td className="p-4 whitespace-nowrap text-green-500">
                      ${item.amount}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button className="bg-primary text-white px-4 py-2 hover:bg-blue-800 transition">
                        Download Receipt
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 border ${
            currentPage === 1 ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border ${
              currentPage === index + 1 ? "bg-gray-200" : "text-gray-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 border ${
            currentPage === totalPages ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
