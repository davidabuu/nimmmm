"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles
import { AppDispatch, RootState } from "@/src/lib/store";
import { fetchNotifications } from "@/src/redux/notification/getNotification";
import { markNotificationAsRead } from "@/src/redux/notification/readNotifcation";


export default function Inbox() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications: messages, status } = useSelector(
    (state: RootState) => state.fetchNotifications
  );

  const [loadingIds, setLoadingIds] = useState<number[]>([]); // Tracks messages being marked as read
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotifications());
    }
  }, [dispatch, status]);

  const handleMarkAsRead = async (id: number) => {
    setLoadingIds((prev) => [...prev, id]); // Add ID to loading state
    await dispatch(markNotificationAsRead(id)); // Dispatch the mark as read action
    setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id)); // Remove ID from loading state
  };

  return (
    <div className="mt-3 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 text-white p-4 mb-6">
        <button className="bg-primary rounded-full p-2">
          <IoArrowBack className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-primary font-medium">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-2">
          {/* Skeleton Loader */}
          {status === "loading" &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-white rounded-lg animate-pulse"
              >
                <Skeleton circle={true} height={24} width={24} />
                <div className="flex-1">
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                  <Skeleton width="40%" />
                </div>
              </div>
            ))}

          {/* Notifications */}
          {status === "succeeded" &&
  (() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unreadMessages = messages.filter((message: any) => !message.isRead);

    if (unreadMessages.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <p>No unread notifications at the moment.</p>
        </div>
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return unreadMessages.map((message: any) => (
      <div
        key={message.id}
        className={`flex items-start gap-4 p-4 bg-white rounded-lg relative transition-transform duration-300 ${
          loadingIds.includes(message.id) ? "opacity-50 scale-95" : ""
        }`}
      >
        {/* Unread Indicator */}
        <div className="flex items-center gap-2">
          {message.isUnread && <FaCircle className="text-red-500 w-2 h-2" />}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900">{message.title}</h3>
          <p className="text-gray-600 text-sm">{message.message}</p>
          <span className="text-gray-400 text-xs">{message.timestamp}</span>
        </div>

        {/* Action Dropdown */}
        <div className="relative">
          <button
            onClick={() =>
              setShowDropdown(showDropdown === message.id ? null : message.id)
            }
            className="p-1 hover:bg-gray-100 rounded"
          >
            <BsThreeDots className="w-5 h-5 text-gray-500" />
          </button>

          {showDropdown === message.id && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleMarkAsRead(message.id)}
                disabled={loadingIds.includes(message.id)}
              >
                {loadingIds.includes(message.id) ? "Marking..." : "Mark as read"}
              </button>
            </div>
          )}
        </div>
      </div>
    ));
  })()}



          {/* Error State */}
          {status === "failed" && (
            <p className="text-red-500">Failed to load notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
}
