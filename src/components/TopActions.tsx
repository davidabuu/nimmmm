"use client";

import Link from "next/link";
import {FiBell } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store";
import { fetchNotifications } from "../redux/notification/getNotification";
import { AiOutlineSearch } from "react-icons/ai";




const TopActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { notifications, status } = useSelector(
    (state: RootState) => state.fetchNotifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const notificationCount = notifications?.length || 0;
  const isLoading = status === "loading";

  return (
    <header className="w-full pt-2">
      <div className="mx-auto flex max-w-7xl justify-end">
        <div className="flex mb-2">

          {/* Search */}
          <Link href={`/members`}>
            <button
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-xl
                         text-gray-700"
            >
              <AiOutlineSearch className="text-lg" />
            </button>
          </Link>

          {/* Notification */}
          <Link href={`/notification`}>
            <button
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl
                         text-gray-700 "
            >
              {/* Bell icon */}
              <FiBell
                className={`text-lg ${
                  isLoading ? "animate-pulse" : ""
                }`}
              />

              {/* Loader (small dot) */}
              {isLoading && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-300 animate-ping" />
              )}

              {/* Badge */}
              {!isLoading && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px]
                                 rounded-full bg-red-600 text-white
                                 text-[10px] font-semibold
                                 flex items-center justify-center px-1">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </button>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default TopActions;
