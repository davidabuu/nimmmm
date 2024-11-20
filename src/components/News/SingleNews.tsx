"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiExternalLink } from "react-icons/fi";
import { FaBell } from "react-icons/fa";

interface RelatedNewsProps {
  id: string;
  title: string;
  date: string;
  time: string;
  imageUrl: string;
}

const RelatedNewsCard = ({
  id,
  title,
  date,
  time,
  imageUrl,
}: RelatedNewsProps) => {
  return (
    <Link
      href={`/news/${id}`}
      className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="relative w-24 h-16 flex-shrink-0">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 96px) 100vw, 96px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FiClock className="w-3 h-3" />
          <time dateTime={date}>{date}</time>
          <span>•</span>
          <time dateTime={time}>{time}</time>
        </div>
      </div>
    </Link>
  );
};

export default function NewsArticle() {
  const [isLoading, setIsLoading] = useState(false);

  const relatedNews: RelatedNewsProps[] = [
    {
      id: "1",
      title:
        "The Nigerian Institute of Management (Chartered) has released its Newsletter for Public Consumption.",
      date: "October 27, 2024",
      time: "2:36 pm",
      imageUrl: "/nnpc.png",
    },
    {
      id: "2",
      title:
        "The Nigerian Institute of Management (Chartered) has released its Newsletter for Public Consumption.",
      date: "October 27, 2024",
      time: "2:36 pm",
      imageUrl: "/nnpc.png",
    },
    {
      id: "3",
      title:
        "The Nigerian Institute of Management (Chartered) has released its Newsletter for Public Consumption.",
      date: "October 27, 2024",
      time: "2:36 pm",
      imageUrl: "/nnpc.png",
    },
    {
      id: "4",
      title:
        "The Nigerian Institute of Management (Chartered) has released its Newsletter for Public Consumption.",
      date: "October 27, 2024",
      time: "2:36 pm",
      imageUrl: "/nnpc.png",
    },
  ];

  const handleDownloadNewsletter = async () => {
    setIsLoading(true);
    try {
      // Handle newsletter download
      console.log("Downloading newsletter...");
    } catch (error) {
      console.error("Error downloading newsletter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-10">
      {/* Notification Icon */}
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>

      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        News
      </h2>
      <main className="min-h-screen bg-gray-50 pb-12">
        {/* Back Navigation */}
        <Link
          href="/news"
          className="fixed top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Back to news"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 pt-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header Banner */}
              <div className="bg-red-600 text-white p-6 rounded-t-lg">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                  The Nigerian Institute of Management(Chartered) has released
                  its&apos; Newsletter for Public Consumption.
                </h1>
                <div className="flex items-center gap-2 text-sm">
                  <FiClock className="w-4 h-4" />
                  <time dateTime="2024-10-27">October 27, 2024</time>
                  <span>•</span>
                  <time dateTime="14:36">2:36 pm</time>
                </div>
              </div>

              {/* Article Content */}
              <article className="bg-white p-6 rounded-b-lg shadow-sm">
                <div className="relative h-[300px] sm:h-[400px] mb-6">
                  <Image
                    src="/nnpc.png"
                    alt="NIM members group photo"
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="prose prose-lg max-w-none">
                  <p>
                    We&apos;re thrilled to announce the release of the Q3 2024
                    edition of the NIM Newsletter! Dive deep into the exciting
                    world of insights, trends and updates curated just for you
                    by our team of experts.
                  </p>
                  <p>
                    Explore the latest updates of the Institute, management
                    strategies, industry highlights and exclusive member
                    features. Stay informed and engaged as we sail through your
                    professional journey.
                  </p>
                  <div className="not-prose">
                    <button
                      onClick={handleDownloadNewsletter}
                      disabled={isLoading}
                      className="inline-flex items-center my-4 gap-2 px-6 py-3 bg-primary text-white  hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      {isLoading ? "Downloading..." : "Download Newsletter"}
                    </button>
                  </div>
                  <p className="mt-4">Happy reading!</p>
                </div>
              </article>
            </div>

            {/* Related News Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Related News</h2>
                <div className="space-y-4">
                  {relatedNews.map((news) => (
                    <RelatedNewsCard
                      key={news.id}
                      {...news}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
