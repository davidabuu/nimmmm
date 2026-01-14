import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

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

}: PublicationCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-24 h-24 shrink-0">
          <Image
            src={'/nnpc.png'}
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
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-[#0A0057]/90 transition-colors">
            Go to publication
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicationCard;
