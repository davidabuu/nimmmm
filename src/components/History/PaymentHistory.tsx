import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { getHistoryPayments } from "@/src/redux/payment/historyPayment";
import TableSkeleton from "../Dashboard/TableSkeleton";
import { AppDispatch, RootState } from "@/src/lib/store";
import jsPDF from "jspdf";

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const itemsPerPage = 5;

  const dispatch = useDispatch<AppDispatch>();
  const { loading: accountLoading } = useSelector(
    (state: RootState) => state.fetchAccountInfo
  );

  const { data: paymentData, loading } = useSelector(
    (state: RootState) => state.getHistoryPayments
  );

  useEffect(() => {
    dispatch(getHistoryPayments());
  }, [dispatch]);

  // Generate PDF Receipt
  const generateReceipt = async (payment: {
    date: string;
    billName: string;
    amount: number;
    id?: string;
    paymentMethod?: string;
  }) => {
    if (!payment) return;

    setDownloadingId(payment.id || payment.date);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Header with logo and title
      const logoWidth = 25;
      const logoX = 20;
      pdf.addImage("/nnpc.png", "PNG", logoX, 15, logoWidth, 20);

      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Receipt from NNPC", logoX + logoWidth + 15, 28);

      // Divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, 42, pageWidth - 20, 42);

      // Bill description title
      let yPos = 55;
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(payment.billName, 20, yPos);

      // Divider
      pdf.setDrawColor(220, 220, 220);
      pdf.line(20, yPos + 5, pageWidth - 20, yPos + 5);

      // Receipt details section
      yPos += 20;
      const labelColor: [number, number, number] = [150, 150, 150];
      const valueColor: [number, number, number] = [0, 0, 0];

      // Helper function to add detail row
      const addDetailRow = (label: string, value: string, y: number) => {
        pdf.setFontSize(11);
        pdf.setTextColor(...labelColor);
        pdf.setFont("helvetica", "normal");
        pdf.text(label, 20, y);

        pdf.setTextColor(...valueColor);
        pdf.setFont("helvetica", "bold");
        pdf.text(value, pageWidth - 20, y, { align: "right" });
      };

      addDetailRow("Amount Paid", `${payment.amount.toLocaleString()}`, yPos);
      yPos += 12;

      addDetailRow("Applicable fees", "0.00", yPos);
      yPos += 12;

      addDetailRow(
        "Payment Method",
        payment.paymentMethod || "Bank Transfer",
        yPos
      );
      yPos += 12;

      addDetailRow(
        "Transaction Reference",
        payment.id || `RC-${Date.now()}`,
        yPos
      );
      yPos += 12;

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(payment.date));

      addDetailRow("Date", formattedDate, yPos);

      // Footer section
      yPos += 30;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, yPos, pageWidth - 20, yPos);

      yPos += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont("helvetica", "normal");
      pdf.text("Thank you for your payment!", pageWidth / 2, yPos, {
        align: "center",
      });

      yPos += 8;
      pdf.text("NNPC Servicom Department", pageWidth / 2, yPos, {
        align: "center",
      });

      yPos += 8;
      pdf.text("servicom@nnpc.gov.ng", pageWidth / 2, yPos, {
        align: "center",
      });

      // Save the PDF
      pdf.save(`receipt-${payment.id || payment.date}.pdf`);
    } catch (error) {
      console.error("Error generating receipt:", error);
    } finally {
      setDownloadingId(null);
    }
  };

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
      <h2 className="text-xl bg-white font-semibold px-4 py-2">
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
                  item: {
                    date: string;
                    billName: string;
                    amount: number;
                    id?: string;
                  },
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
                      ₦{item.amount.toLocaleString()}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => generateReceipt(item)}
                        disabled={downloadingId === (item.id || item.date)}
                        className={`bg-primary text-white px-4 py-2 hover:bg-blue-800 transition flex items-center gap-2 ${
                          downloadingId === (item.id || item.date)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {downloadingId === (item.id || item.date) ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Downloading...
                          </>
                        ) : (
                          "Download Receipt"
                        )}
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
      {filteredData.length > 0 && (
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
      )}
    </div>
  );
};

export default PaymentHistory;