import React from "react";

import Image from "next/image";

interface BoxProps {
  imageSrc: string; // The source for the image
  title: string; // The main title text
  description: string; // The description text
  link: string; // The link URL
}

const Box: React.FC<BoxProps> = ({ imageSrc, title, description}) => {
  return (
   
      <div className="flex  h-24 items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        {/* Icon/Image */}
        <div className="w-12 h-12  flex items-center justify-center rounded-md">
          <Image
            src={imageSrc}
            alt={title}
            width={50}
            height={50}
          />
        </div>

        {/* Text Content */}
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
   
  );
};

export default Box;
