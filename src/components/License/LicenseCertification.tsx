"use client";

import { useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";

interface LicenseCertificationProps {
  firstName: string;
  lastName: string;

}

export default function LicenseCertification({
  firstName,
  lastName,
  
}: LicenseCertificationProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          // scale: 2, // Increase scale for better quality
          useCORS: true, // This is important for loading cross-origin images
        });

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "NIM_Certificate.png";
        link.click();
      } catch (error) {
        console.error("Error generating certificate:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Certificate Preview */}
        <div
          ref={certificateRef}
          className="bg-white p-8 rounded-lg shadow-lg relative"
        >
          <div className="border-4 border-blue-900 p-12">
            {/* Logo and Header */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/nnpc.png"
                alt="NIM Logo"
                width={100}
                height={100}
                className="mb-4"
              />
              <h2 className="text-xl font-semibold text-blue-900 text-center">
                NIGERIAN INSTITUTE OF MANAGEMENT
                <span className="block">(CHARTERED)</span>
              </h2>
              <h3 className="text-lg font-medium mt-2 text-yellow-600">
                MANAGEMENT PRACTICE LICENCE
              </h3>
            </div>

            {/* Certificate Content */}
            <div className="text-center space-y-6 mb-12">
              <p className="text-lg">This is to certify that</p>
              <p className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mx-auto w-2/3">
                {`${firstName} ${lastName}` || "RECIPIENT NAME"}
              </p>
              <p className="text-base max-w-2xl mx-auto">
                having met the standards in knowledge, competence and experience
                as prescribed by the Institute is hereby recognized as a
              </p>
              <h4 className="text-xl font-bold text-red-600">
                CERTIFIED MANAGEMENT PRACTITIONER
              </h4>
              <p className="text-sm">
                We hereby append our seal as certification of his/her worthiness
                to practice the profession within the validity period.
              </p>
            </div>

            {/* Signatures Section */}
            <div className="flex justify-between items-end mt-8">
              <div className="text-center">
                <Image
                  src="/1.jpg"
                  alt="Signature 1"
                  width={150}
                  height={60}
                  className="mb-2"
                />
                <div className="border-t border-gray-400 pt-2">
                  <p className="text-sm font-medium">
                    Registrar / Chief Executive
                  </p>
                  <p className="text-sm">{"Date"}</p>
                </div>
              </div>

              <div className="mx-8">
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 rounded-full bg-red-700 " />
                  <div className="absolute inset-2 rounded-full border-2 border-red-700" />
                </div>
              </div>

              <div className="text-center">
                <Image
                  src="/2.jpg"
                  alt="Signature 2"
                  width={150}
                  height={60}
                  className="mb-2"
                />
                <div className="border-t border-gray-400 pt-2">
                  <p className="text-sm font-medium">
                    Director, Capacity Building
                  </p>
                  <p className="text-sm">{ "Date"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={downloadCertificate}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
