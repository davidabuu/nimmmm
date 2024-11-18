"use client";

import { FiDownload } from "react-icons/fi";
import Image from "next/image";

interface JournalArticleProps {
  issn: string;
  title: string;
  logoUrl: string;
  content: string[];
}

export default function SinglePublication() {
  const articleData: JournalArticleProps = {
    issn: "ISSN-2222-2222",
    title: "Journal Of Management",
    logoUrl: "/nnpc.png", // Image placeholder URL
    content: [
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum.",
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum.",
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum.",
    ],
  };

  const handleDownload = () => {
    // Handle publication download
    console.log("Downloading publication...");
  };

  return (
    <article className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24">
            <Image
              src={articleData.logoUrl}
              alt="Journal logo"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">{articleData.issn}</p>
            <h1 className="text-2xl font-bold text-gray-900">
              {articleData.title}
            </h1>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0057] text-white  hover:bg-[#0A0057]/90 transition-colors"
        >
          <FiDownload className="w-4 h-4" />
          Download publication
        </button>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {articleData.content.map((paragraph, index) => (
          <p
            key={index}
            className="mb-6 leading-relaxed text-gray-700"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
