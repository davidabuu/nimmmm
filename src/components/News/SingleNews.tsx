"use client";

import { useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store";
import { getSingleNews } from "@/src/redux/news/getSingleNews";
import { useParams, useRouter } from "next/navigation";
import { FiClock } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoArrowBack } from "react-icons/io5";



export default function NewsArticle() {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams(); // ✅ CORRECT WAY

  const { data: singleNews, loading, error } = useSelector(
    (state: RootState) => state.getSingleNews
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleNews(id as string));
    }
  }, [dispatch, id]);





  return (
    <div>
      {/* Header */}
      <div
      onClick={() => router.back()}
      className="flex items-center gap-4 border-b border-gray-200 p-4 cursor-pointer"
    >
      <button
        type="button"
        className="bg-primary rounded-full p-2 text-white"
      >
        <IoArrowBack className="w-6 h-6" />
      </button>

      <h1 className="text-xl text-primary font-medium">News</h1>
    </div>

      <main className="min-h-screen bg-gray-50 pb-12">
        <div className="m px-4 pt-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Main Article */}
            <div className="lg:col-span-2">
              {loading ? (
                <Skeleton height={300} count={3} />
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  {/* Title Section */}
                  <div className="bg-primary text-white p-6 rounded-t-lg">
                    <h1 className="text-2xl font-bold mb-3">
                      {singleNews?.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                      <FiClock />
                      <span>
                        {new Date(
                          singleNews?.createdAt || ""
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Article */}
                  <article className="bg-white p-6 rounded-b-lg shadow">
                   
                    <div className="prose max-w-none">
                  <p  dangerouslySetInnerHTML={{
              __html: singleNews?.content || ""
            }} className="text-primary text-sm mb-2"></p>

                    
                    </div>
                  </article>
                </>
              )}
            </div>

            {/* Related News */}
            
          </div>
        </div>
      </main>
    </div>
  );
}
