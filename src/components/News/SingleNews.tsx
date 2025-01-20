"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store"; // Adjust to your store path
import { getSingleNews } from "@/src/redux/news/getSingleNews";
import { useSearchParams } from "next/navigation";
import {  FiClock, FiExternalLink } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoArrowBack } from "react-icons/io5";

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
          alt={title}
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
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: singleNews, loading, error } = useSelector(
    (state: RootState) => state.getSingleNews
  );

  const relatedNews: RelatedNewsProps[] = [
    {
      id: "1",
      title: "Related news item 1",
      date: "October 27, 2024",
      time: "2:36 pm",
      imageUrl: "/nnpc.png",
    },
    {
      id: "2",
      title: "Related news item 2",
      date: "October 27, 2024",
      time: "2:36 pm",
      imageUrl: "/nnpc.png",
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getSingleNews(id));
    }
  }, [dispatch, id]);

  const handleDownloadNewsletter = async () => {
    setIsLoading(true);
    try {
      // Handle newsletter download logic
      console.log("Downloading newsletter...");
    } catch (error) {
      console.error("Error downloading newsletter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-4 border-b border-gray-200 text-white p-4 mb-6">
        <Link href="/news">
          <button className="bg-primary rounded-full p-2">
            <IoArrowBack className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-xl text-primary font-medium">News</h1>
      </div>
      <main className="min-h-screen bg-gray-50 pb-12">
       

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 pt-16">
            <div className="lg:col-span-2">
              {/* Skeleton Loader */}
              {loading ? (
                <Skeleton height={200} count={3} />
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <>
                  <div className="bg-red-600 text-white p-6 rounded-t-lg">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                      {singleNews?.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                      <FiClock className="w-4 h-4" />
                      <time dateTime={singleNews?.createdAt}>
                        {new Date(singleNews?.createdAt || "").toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </time>
                      <span>•</span>
                      <time dateTime={singleNews?.createdAt}>
                        {new Date(singleNews?.createdAt || "").toLocaleTimeString(
                          "en-US"
                        )}
                      </time>
                    </div>
                  </div>

                  <article className="bg-white p-6 rounded-b-lg shadow-sm">
                    <div className="relative h-[300px] sm:h-[400px] mb-6">
                      {singleNews? (
                        <Image
                          src={'/nnpc.png'}
                          alt={singleNews.title}
                          width={200}
                          height={160}
                          className=" rounded-lg"
                        />
                      ) : (
                        <Skeleton height={300} />
                      )}
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <p>{singleNews?.content}</p>
                      <div className="not-prose">
                        <button
                          onClick={handleDownloadNewsletter}
                          disabled={isLoading}
                          className="inline-flex items-center my-4 gap-2 px-6 py-3 bg-primary text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          {isLoading ? "Downloading..." : "Download Newsletter"}
                        </button>
                      </div>
                      <p className="mt-4">Happy reading!</p>
                    </div>
                  </article>
                </>
              )}
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
