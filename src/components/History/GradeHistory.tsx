/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchGradeCriteria } from "@/src/redux/grade/gradeCriteria";
import { AppDispatch, RootState } from "@/src/lib/store";

const GradeHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: gradeData, loading } = useSelector(
    (state: RootState) => state.fetchGradeCriteria
  );

  useEffect(() => {
    dispatch(fetchGradeCriteria());
  }, [dispatch]);

  const hasData = Array.isArray(gradeData) && gradeData.length > 0;

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl px-4 py-2 font-semibold mb-4">
        Grade History
      </h2>

      <div className="overflow-x-auto px-4">
        {/* Loading */}
        {loading && <Skeleton count={5} height={40} />}

        {/* Empty State */}
        {!loading && !hasData && (
          <div className="text-center py-10 text-gray-500">
            No grade history available
          </div>
        )}

        {/* Table */}
        {!loading && hasData && (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="p-4 text-left whitespace-nowrap">S/N</th>
                <th className="p-4 text-left whitespace-nowrap">Grade</th>
                <th className="p-4 text-left whitespace-nowrap">
                  Date Conferred
                </th>
              </tr>
            </thead>
            <tbody>
              {gradeData.map((item: any, index: number) => (
                <tr key={item.id ?? index} className="border-b">
                  <td className="p-4 whitespace-nowrap">{index + 1}</td>
                  <td className="p-4 whitespace-nowrap">{item.title}</td>
                  <td className="p-4 whitespace-nowrap">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination (optional, keep only if needed) */}
      {!loading && hasData && (
        <div className="flex justify-end mt-4 px-4 pb-4">
          <button className="px-4 py-2 text-gray-500 border">1</button>
          <button className="px-4 py-2 text-gray-500 border">2</button>
          <button className="px-4 py-2 text-gray-500 border">Next</button>
        </div>
      )}
    </div>
  );
};

export default GradeHistory;
