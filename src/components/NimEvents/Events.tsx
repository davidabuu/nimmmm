"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiTag } from "react-icons/fi";

interface EventCardProps {
  imageUrl: string;
  title: string;
  date: string;
  mode: string;
  time: string;
  price: {
    amount: number | null;
    label: string;
  };
  registrationLink: string;
}

export default function Events({
  imageUrl = "/nnpc.png",
  title = "2024 Management Day",
  date = "Tuesday, November 19, 2024",
  mode = "HYBRID",
  time = "11:00am",
  price = { amount: null, label: "Free" },
  registrationLink = "/nim-events",
}: EventCardProps) {
  return (
    <div className="group  flex flex-  rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="  ">
        <Image
          src={imageUrl}
          alt={title}
          width={150}
          height={150}
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <dl className="mt-4 space-y-2 text-sm text-gray-600">
            <div>
              <dt className="inline font-medium">Date: </dt>
              <dd className="inline">{date}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Mode: </dt>
              <dd className="inline">{mode}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Time: </dt>
              <dd className="inline">{time}</dd>
            </div>
          </dl>
        </div>

        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiTag
              className={price.amount ? "text-red-500" : "text-green-500"}
            />
            <span
              className={`text-sm font-medium ${
                price.amount ? "text-red-500" : "text-green-500"
              }`}
            >
              {price.amount ? `N${price.amount.toLocaleString()}` : price.label}
            </span>
          </div>

          <Link
            href={registrationLink}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Register
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
