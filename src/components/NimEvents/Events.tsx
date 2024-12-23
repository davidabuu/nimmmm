import Image from "next/image";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppDispatch, RootState } from "@/src/lib/store";
import { getEvents } from "@/src/redux/events/getEvents";

export default function EventCardGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.getEvents);

  useEffect(() => {
    dispatch(getEvents(""));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="max-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Skeleton height="100%" />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  <Skeleton
                    height={24}
                    width="80%"
                  />
                  <div className="space-y-1 text-sm text-gray-600">
                    <Skeleton
                      height={16}
                      width="60%"
                    />
                    <Skeleton
                      height={16}
                      width="50%"
                    />
                    <Skeleton
                      height={16}
                      width="70%"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton
                      circle
                      height={20}
                      width={20}
                    />
                    <Skeleton
                      height={16}
                      width="40px"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Skeleton
                    height={40}
                    width="100%"
                  />
                </div>
              </div>
            </div>
          ))
        : data?.map((event) => (
            <div
              key={event.id}
              className="max-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={"/ddd.png"}
                  alt={"Hll"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{event.name}</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Date: {event.date}</p>
                    <p>Mode: {event.mode}</p>
                    <p>Time: {event.time}</p>
                  </div>
                  {event.isFree ||
                    (!event.isFree && (
                      <div className="flex items-center text-red-500 gap-1">
                        <FiTag className="h-4 w-4" />
                        <span>Free</span>
                      </div>
                    ))}
                </div>

                <div className="mt-4">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-800 text-white rounded-lg">
                    Register
                    <FiArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
