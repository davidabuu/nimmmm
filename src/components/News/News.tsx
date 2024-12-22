"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store"; // Adjust to your store path
// Replace with your news action
import { FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import Link from "next/link";
import { getNews } from "@/src/redux/news/getPublication";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface NewsCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  time: string;
  imageUrl: string;
  onReadMore: () => void;
}

function NewsCard({
  title,
  author,
  date,
  content,
  time,
  onReadMore,
}: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src="/ddd.png" // Default placeholder image
          alt={title}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-semibold text-base mb-2">{title}</h3>

        {/* Author */}
        <p className="text-primary text-sm mb-4">By: {author}</p>
        <p className="text-primary text-sm mb-4">{content}</p>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <FiClock className="w-4 h-4" />
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>

        {/* Read More Button */}
        <Link href="">
          <button
            onClick={onReadMore}
            className="w-full py-2 text-center text-white bg-primary hover:bg-blue-800 transition-colors rounded"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: newsItems,
    loading,
    error,
  } = useSelector((state: RootState) => state.getNews);

  useEffect(() => {
    dispatch(getNews(""));
  }, [dispatch]);

  const itemsPerPage = 6; // Number of news items per page
  const displayedItems = Array.isArray(newsItems)
    ? newsItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

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
        {loading ? (
          <Skeleton
            count={10}
            height={100}
          />
        ) : error ? (
          <p className="text-red-500">Error loading news: {error}</p>
        ) : Array.isArray(newsItems) && newsItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedItems.map((item, index) => (
              <NewsCard
                key={index}
                title={item.title}
                content={item.content}
                author={item.author}
                date={new Date().toLocaleDateString()}
                time={new Date().toLocaleTimeString()}
                imageUrl={item.imageUrl || "/placeholder.png"}
                onReadMore={() =>
                  console.log(`Reading more about ${item.title}`)
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No news available.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

        
        
        

          <button
           
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
