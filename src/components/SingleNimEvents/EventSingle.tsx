"use client";

import Image from "next/image";

import {
 
  FiMapPin,
  FiCalendar,
  FiClock,
  FiPhone,
} from "react-icons/fi";

export default function EventsDetails() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Event Poster */}
          <div className="relative bg-primary rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/ProfilePic.jpg"
              alt="2024 Management Day"
              width={600}
              height={600}
              
            />
          </div>

          {/* Event Details */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#000033] mb-4">
                2024 MANAGEMENT DAY
              </h1>
              <h2 className="text-lg font-bold text-red-600 mb-2">Theme:</h2>
              <p className="text-gray-800 font-medium">
                Innovation and Change Management: Fostering the Culture of
                Innovation in a Rapidly Evolving Business Landscape
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#000033] mb-2">
                Guest Speaker:
              </h2>
              <p className="text-gray-800">
                Mr. Seni Adetu, MNIM GCEO, First Primus
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <FiCalendar className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Date</h3>
                  <p className="text-gray-600">Tuesday, November 19, 2024</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiClock className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Time</h3>
                  <p className="text-gray-600">11:00 AM Prompt</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiMapPin className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Venue</h3>
                  <p className="text-gray-600">
                    NECA House, Hakeem Balogun Street, Alausa, Ikeja, Lagos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiPhone className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">For Enquiries</h3>
                  <p className="text-gray-600">
                    KEMI – 0803 492 1626
                    <br />
                    AKINKUNMI – 0807 750 0306
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                For virtual participation, please click the button below to
                register:
              </p>
              <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white  hover:bg-[#000044] transition-colors">
                Register
              </button>
              <p className="text-green-600 font-medium">Attendance is free</p>
            </div>

            <div className="border-t pt-6 space-y-2">
              <p className="text-gray-600">
                We look forward to welcoming you at the event.
              </p>
              <p className="text-gray-600">Thank you.</p>
              <div>
                <p className="font-bold text-[#000033]">
                  Mrs. Taiwo Ganiyat Olusesi, MNIM
                </p>
                <p className="text-gray-600">Registrar/CE</p>
                <p className="text-gray-600">08091828375</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
