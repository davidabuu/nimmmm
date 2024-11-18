"use client";

import { useState } from "react";
import Image from "next/image";
import { FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaBell } from "react-icons/fa";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  time: string;
  imageUrl: string;
  onReadMore: () => void;
}

function NewsCard({
  title,
  excerpt,
  date,
  time,
  imageUrl,
  onReadMore,
}: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative h-20 w-full">
        <Image
          src={imageUrl}
          alt={title}
          width={100}
          height={100}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiClock className="w-4 h-4" />
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>

        <button
          onClick={onReadMore}
          className="block w-full py-2 text-center text-white bg-primary hover:bg-[#0A0057]/90 transition-colors"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const newsItems = [
    {
      title:
        "The Nigerian Institute Of Management (Chartered) Has Released Its Newsletter For Public Consumption",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "October 21, 2024",
      time: "2:34 pm",
      imageUrl: "/nnpc.png",
    },
    {
      title:
        "The Nigerian Institute Of Management (Chartered) Has Released Its Newsletter For Public Consumption",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "October 21, 2024",
      time: "2:34 pm",
      imageUrl: "/nnpc.png",
    },
    {
      title:
        "The Nigerian Institute Of Management (Chartered) Has Released Its Newsletter For Public Consumption",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "October 21, 2024",
      time: "2:34 pm",
      imageUrl: "/nnpc.png",
    },
    {
      title:
        "The Nigerian Institute Of Management (Chartered) Has Released Its Newsletter For Public Consumption",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "October 21, 2024",
      time: "2:34 pm",
      imageUrl: "/nnpc.png",
    },
    {
      title:
        "The Nigerian Institute Of Management (Chartered) Has Released Its Newsletter For Public Consumption",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "October 21, 2024",
      time: "2:34 pm",
      imageUrl: "/nnpc.png",
    },
    {
      title:
        "The Nigerian Institute Of Management (Chartered) Has Released Its Newsletter For Public Consumption",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "October 21, 2024",
      time: "2:34 pm",
      imageUrl: "/nnpc.png",
    },
    // Repeat similar items for grid...
  ];

  return (
    <div className="mx-10">
      {/* Notification Icon */}
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>

      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        News
      </h2>

      <div className="max-w-7xl mx-auto p-6">
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newsItems.map((item, index) => (
            <NewsCard
              key={index}
              {...item}
              onReadMore={() => console.log(`Reading more about ${item.title}`)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
              ${
                currentPage === page
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            disabled={currentPage === 3}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
