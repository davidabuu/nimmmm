// imports
import React, { useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store";
import { fetchAccountInfo } from "@/src/redux/auth/fetchAccountInfo";
import Box from "../Box";
import { getOutstandingPayments } from "@/src/redux/payment/outstandingPayment";
import TableSkeleton from "./TableSkeleton";
import { storeEncryptedMember } from "@/src/service/utils";

const formatDate = (date?: string | null): string => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatAmount = (amount: string | number): string => {
  return `₦${Number(amount).toLocaleString("en-NG")}`;
};


interface PaymentEntry {
  id: number;
  description: string;
  amount: string | number;
  paid: boolean;
  paidAt?: string | null;
  createdAt?: string | null;
}

interface PaymentSummary {
  totalUnpaid: number;
  entries: PaymentEntry[];
}



const AdminDashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading: accountLoading, accountInfo } = useSelector(
    (state: RootState) => state.fetchAccountInfo
  );

  const { data: outstandingPayments, loading: paymentsLoading } = useSelector(
    (state: RootState) => state.getOutstandingPayments
  );

  useEffect(() => {
    dispatch(fetchAccountInfo()).then((action) => {
      if (fetchAccountInfo.fulfilled.match(action)) {
        const membershipId = action.payload?.data?.id;
        const memberData = action.payload?.data?.member;
        
        if (memberData?.grade && memberData?.id) {
          storeEncryptedMember({ grade: memberData.grade, id: memberData.id });
        }

        if (membershipId) {
          dispatch(getOutstandingPayments(membershipId));
        }
      }
    });
  }, [dispatch]);

  const member = accountInfo?.member;
  const payments = outstandingPayments as PaymentSummary | null;

  return (
    <div className="p-4 md:p-6 m-2 md:m-6">
      {/* Profile */}
      <div className="bg-white p-6 flex items-center rounded-lg shadow-md">
        <Image
          src="/img.png"
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full"
        />

        <div className="ml-3">
          {accountLoading ? (
            <>
              <Skeleton width={120} height={18} />
              <Skeleton width={80} height={14} className="mt-1" />
            </>
          ) : (
            <>
              <h1 className="font-semibold text-lg">
                {member?.first_name || "N/A"}
              </h1>
              <p className="text-sm text-gray-500">
                ID: {accountInfo?.id || "N/A"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Box
          imageSrc="/Frame1.png"
          title="Grade"
          description={accountLoading ? "" : member?.grade || "N/A"}
          loading={accountLoading}
        />

        <Box
          imageSrc="/Frame2.png"
          title="Chapter"
          description={
            accountLoading ? "" : member?.chapter?.state || "N/A"
          }
          loading={accountLoading}
        />

        <Box
          imageSrc="/Frame3.png"
          title="Outstanding Fees"
          description={
            accountLoading || paymentsLoading
              ? "Outstanding Fees"
              : formatAmount(payments?.totalUnpaid || 0)
          }
          loading={accountLoading || paymentsLoading}
        />
      </div>

      {/* Payments Table */}
      <div className="mt-8 bg-white rounded-lg shadow-sm overflow-x-auto">
        <h1 className="p-4 font-medium text-lg">Outstanding Payments</h1>

        {paymentsLoading || accountLoading ? (
          <TableSkeleton rows={4} cols={5} />
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4"></th>
                <th className="p-4 text-sm text-gray-500">Date</th>
                <th className="p-4 text-sm text-gray-500">Description</th>
                <th className="p-4 text-sm text-gray-500">Amount</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
              {payments?.entries && payments.entries.length > 0 ? (
                payments.entries.map((payment: PaymentEntry) => {
                  const isPaid = payment.paid;

                  return (
                    <tr key={payment.id} className="border-t">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          disabled={isPaid}
                          className="h-5 w-5 cursor-pointer"
                          aria-label={`Select payment ${payment.id}`}
                        />
                      </td>

                      <td className="p-4 text-sm text-gray-600">
                        {isPaid
                          ? formatDate(payment.paidAt)
                          : formatDate(payment.createdAt)}
                      </td>

                      <td className="p-4 font-medium">
                        {payment.description}
                      </td>

                      <td
                        className={`p-4 font-semibold ${
                          isPaid ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {formatAmount(payment.amount)}
                      </td>

                      <td className="p-4">
                        {!isPaid ? (
                          <a
                            href={`/payment-gateway?description=${encodeURIComponent(
                              payment.description
                            )}&amount=${payment.amount}`}
                          >
                            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                              Proceed to Payment
                            </button>
                          </a>
                        ) : (
                          <span className="text-green-600 text-sm font-medium">
                            Paid
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No outstanding payments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;