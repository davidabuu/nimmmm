import React from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BoxProps {
  imageSrc: string; // The source for the image
  title: string; // The main title text
  description: string; // The description text

  loading?: boolean; // Whether the box is in loading state
}

const Box: React.FC<BoxProps> = ({ imageSrc, title, description,  loading = false }) => {
  return (
    <div className="flex h-24 items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
      {/* Icon/Image */}
      <div className="w-12 h-12 flex items-center justify-center rounded-md">
        {loading ? (
          <Skeleton circle height={50} width={50} />
        ) : (
          <Image src={imageSrc} alt={title} width={50} height={50} />
        )}
      </div>

      {/* Text Content */}
      <div className="ml-4">
        {loading ? (
          <>
            <Skeleton width={100} height={20} className="mb-2" />
            <Skeleton width={150} height={15} />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Box;
