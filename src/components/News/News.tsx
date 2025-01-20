"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store"; // Adjust to your store path
import { FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { getNews } from "@/src/redux/news/getNews";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoArrowBack } from "react-icons/io5";

interface NewsCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  time: string;
}

function NewsCard({
  id,
  title,
  author,
  date,
  content,
  time,
}: NewsCardProps) {
  const router = useRouter(); // For navigation

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src="/ddd.png" // Default placeholder image
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-primary font-semibold text-base mb-2">{title}</h3>
        <p className="text-primary text-sm mb-2">By: {author}</p>
        <p className="text-primary text-sm mb-2">{content}</p>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <FiClock className="w-4 h-4" />
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>

        {/* Read More Button */}
        <button
          onClick={() => router.push(`/single-news?id=${id}`)} // Navigate with query params
          className="w-full py-2 text-center text-white bg-primary hover:bg-blue-800 transition-colors rounded"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { data: newsItems, loading, error } = useSelector(
    (state: RootState) => state.getNews
  );

  useEffect(() => {
    dispatch(getNews(""));
  }, [dispatch]);

  const itemsPerPage = 6;
  const displayedItems = Array.isArray(newsItems)
    ? newsItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <div className="">
      <div className="flex items-center gap-4 border-b border-gray-200 text-white p-4 mb-6">
        <Link href="/reports">
          <button className="bg-primary rounded-full p-2">
            <IoArrowBack className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-xl text-primary font-medium">News</h1>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <Skeleton count={10} height={100} />
        ) : error ? (
          <p className="text-red-500">Error loading news: {error}</p>
        ) : Array.isArray(newsItems) && newsItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedItems.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                author={item.author}
                date={new Date().toLocaleDateString()}
                time={new Date().toLocaleTimeString()}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No news available.</p>
        )}

        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50">
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
