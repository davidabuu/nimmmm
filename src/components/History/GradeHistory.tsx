// imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchGradeCriteria } from "@/src/redux/grade/gradeCriteria";
import { AppDispatch , RootState} from "@/src/lib/store";


const GradeHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access grade criteria and loading state from Redux
  const { data: gradeData, loading } = useSelector(
    (state: RootState) => state.fetchGradeCriteria
  );
console.log(gradeData)
  // Fetch grade criteria data on component mount
  useEffect(() => {
    dispatch(fetchGradeCriteria());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <h2 className="text-xl px-4 py-2 font-semibold mb-4">Grade History</h2>
      <div className="overflow-x-auto">
        {loading ? (
          <Skeleton count={5} height={40} />
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="p-4 whitespace-nowrap text-left">S/N</th>
                <th className="p-4 whitespace-nowrap text-left">Grade</th>
                <th className="p-4 whitespace-nowrap text-left">Date Conferred</th>
              </tr>
            </thead>
            <tbody>
              {gradeData?.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4 whitespace-nowrap">{index + 1}</td>
                  <td className="p-4 whitespace-nowrap">{item.title}</td>
                  <td className="p-4 whitespace-nowrap">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 text-gray-500 border">1</button>
        <button className="px-4 py-2 text-gray-500 border">2</button>
        <button className="px-4 py-2 text-gray-500 border">Next</button>
      </div>
    </div>
  );
};

export default GradeHistory;
