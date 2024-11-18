"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FiSearch,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface PublicationCardProps {
  issn: string;
  title: string;
  description: string;
  imageUrl: string;
}

function PublicationCard({
  issn,
  title,
  description,
  imageUrl,
}: PublicationCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-24 h-24 shrink-0">
          <Image
            src={imageUrl}
            alt={`${title} logo`}
            className="w-full h-full"
            width={50}
            height={50}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{issn}</p>
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="sm:self-center mt-4 sm:mt-0">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white  hover:bg-[#0A0057]/90 transition-colors">
            Go to publication
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PublicationUI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  const publications = [
    {
      issn: "ISSN-2222-2222",
      title: "Journal Of Management",
      description:
        "This journal welcomes original research articles, reviews, and perspectives in all areas of management.",
      imageUrl: "/nnpc.png",
    },
    {
      issn: "ISSN-2222-2222",
      title: "Journal Of Management",
      description:
        "This journal welcomes original research articles, reviews, and perspectives in all areas of management.",
      imageUrl: "/nnpc.png",
    },
    {
      issn: "ISSN-2222-2222",
      title: "Journal Of Management",
      description:
        "This journal welcomes original research articles, reviews, and perspectives in all areas of management.",
      imageUrl: "/nnpc.png",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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
            onChange={handleSearch}
            placeholder="Search"
            className="w-full md:w-[300px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {publications.map((pub, index) => (
          <PublicationCard
            key={index}
            {...pub}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2  hover:bg-gray-100 disabled:opacity-50"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8  flex items-center justify-center text-sm
              ${
                currentPage === i + 1
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
