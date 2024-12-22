// TableSkeleton Component
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton styles

interface TableSkeletonProps {
  rows: number;
  cols: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows, cols }) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, index) => (
            <th key={index} className="p-4">
              <Skeleton width="100%" height={20} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <td key={colIndex} className="p-4">
                <Skeleton width="100%" height={20} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
