/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { AppDispatch, RootState } from "@/src/lib/store";
import { fetchNotifications } from "@/src/redux/notification/getNotification";
import { markNotificationAsRead } from "@/src/redux/notification/readNotifcation";
import Link from "next/link";

export default function Inbox() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, status } = useSelector(
    (state: RootState) => state.fetchNotifications
  );

  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotifications());
    }
  }, [dispatch, status]);

  const handleMarkAsRead = async (id: number) => {
    setLoadingIds((prev) => [...prev, id]);

    const result = await dispatch(markNotificationAsRead(id));

    // ✅ If successful, refresh notifications
    if (markNotificationAsRead.fulfilled.match(result)) {
      dispatch(fetchNotifications());
    }

    setLoadingIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="mt-3 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 p-4 mb-6">
         <Link href="/dashboard">
          <button className="bg-primary rounded-full p-2 text-white">
          <IoArrowBack className="w-6 h-6" />
        </button> </Link>
       
        <h1 className="text-xl text-primary font-medium">Notifications</h1>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        {/* Skeleton */}
        {status === "loading" &&
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 bg-white rounded-lg"
            >
              <Skeleton circle height={24} width={24} />
              <div className="flex-1">
                <Skeleton width="60%" />
                <Skeleton width="80%" />
                <Skeleton width="40%" />
              </div>
            </div>
          ))}

        {/* Empty State */}
        {status === "succeeded" && notifications.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notifications yet.
          </div>
        )}

        {/* Notifications */}
        {status === "succeeded" &&
          notifications.map((message: any) => {
            const isUnread = !message.isRead;
            const isLoading = loadingIds.includes(message.id);

            // ✅ Only show dropdown item if unread
            const items: MenuProps["items"] = isUnread
              ? [
                  {
                    key: "mark-read",
                    label: (
                      <button
                        className="w-full text-left"
                        disabled={isLoading}
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        {isLoading ? "Marking..." : "Mark as read"}
                      </button>
                    ),
                  },
                ]
              : [];

            return (
              <div
                key={message.id}
                className={`flex items-start gap-4 p-4 bg-white rounded-lg transition ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                {/* Unread Dot */}
                <div className="mt-1">
                  {isUnread && (
                    <FaCircle className="text-primary w-2 h-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium ${
                      isUnread ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {message.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isUnread ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {message.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {message.timestamp}
                  </span>
                </div>

                {/* Dropdown (only if unread) */}
                {isUnread && (
                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <BsThreeDots className="w-5 h-5 text-gray-500" />
                    </button>
                  </Dropdown>
                )}
              </div>
            );
          })}

        {/* Error */}
        {status === "failed" && (
          <p className="text-red-500">Failed to load notifications.</p>
        )}
      </div>
    </div>
  );
}
