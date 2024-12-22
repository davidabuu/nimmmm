import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getPublication } from "@/src/redux/publications/getPublication";
import PublicationCard from "./PublicationCard";

export default function PublicationUI() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: publications,
    loading,
    error,
  } = useSelector((state: RootState) => state.getPublication);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    dispatch(getPublication(""));
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold border-b pb-2 text-gray-900 mb-6">
        Publications
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search:
        </label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full md:w-[300px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Publications List */}
      {/* Publications List */}
      <div className="space-y-4">
        {loading ? (
          <Skeleton
            count={10}
            height={100}
          />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : Array.isArray(publications) && publications.length > 0 ? (
          publications.map((pub, index) => (
            <PublicationCard
              key={index}
              {...pub}
            />
          ))
        ) : (
          <p className="text-gray-500">No publications found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <button className="p-2 hover:bg-gray-100 disabled:opacity-50">
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
