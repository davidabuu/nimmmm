import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store";
import Image from "next/image";
import {  FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal } from "antd";
import { searchMembers, resetMembers } from "@/src/redux/members/getMembers";
import { BiPhoneIncoming } from "react-icons/bi";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  grade: string;
  chapter: number;
  zone: number;
  date_of_election: string;
  license_status: string;
  phone: string;
}

interface MemberCardProps {
  member: Member;
  onViewDetails: (member: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onViewDetails }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <Image src="/img.png" alt={member.first_name} width={64} height={64} className="rounded-full" />
      <h3 className="text-lg font-semibold mt-1">{member.first_name} {member.last_name}</h3>
      <p className="text-gray-600">{member.grade}</p>
      <button
        className="bg-primary text-white w-full mt-4 py-2  hover:bg-blue-800 transition"
        onClick={() => onViewDetails(member)}
      >
        View Details
      </button>
    </div>
  );
};

const MemberDashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { loading,  error } = useSelector((state: RootState) => state.searchMembers);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      setPage(1);
      dispatch(resetMembers());
      dispatch(searchMembers({ query, page: 1 })).then((action) => {
        if (searchMembers.fulfilled.match(action)) {
          setAllMembers(action.payload.data);
        }
      });
    }
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    dispatch(searchMembers({ query, page: newPage })).then((action) => {
      if (searchMembers.fulfilled.match(action)) {
        setAllMembers(action.payload.data);
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center  gap-4 mb-4">
      <Link href="/dashboard">
          <button className="bg-primary rounded-full p-2">
            <IoArrowBack className="w-6 text-white h-6" />
          </button>
        </Link>
        <form onSubmit={handleSearch} className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Search Members"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded w-full md:w-[60%]"
          />
          <button type="submit" className="bg-primary text-white px-3 py-1  hover:bg-blue-800 transition">
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <Skeleton count={5} height={100} />
      ) : error && allMembers.length === 0 ? (
        <p className="text-center text-gray-500">No user with that name found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allMembers.map((member) => (
              <MemberCard key={member.id} member={member} onViewDetails={setSelectedMember} />
            ))}
          </div>
          {allMembers.length > 0 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => changePage(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="p-2 rounded-md bg-gray-200 disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="px-4 py-2">Page {page}</span>
              <button
                onClick={() => changePage(page + 1)}
                className="p-2 rounded-md bg-gray-200"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}
      <Modal
  open={!!selectedMember}
  onCancel={() => setSelectedMember(null)}
  footer={null}
  className="rounded-lg"
  width={400}
>
  {selectedMember && (
    <div className="p-6">
      <div className="text-center mb-6">
        <Image 
          src="/img.png" 
          alt={selectedMember.first_name} 
          width={100}
          height={100}
          className="rounded-full mx-auto border-4 border-white shadow-lg"
        />
        <h3 className="text-xl font-bold mt-4 text-gray-800">
          {selectedMember.first_name} {selectedMember.last_name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">ID: {selectedMember.id}</p>
      </div>

      <div className="space-y-4 text-sm border-t border-b border-gray-100 py-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Grade:</span>
          <span className="text-gray-700">{selectedMember.grade}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Chapter:</span>
          <span className="text-gray-700">{selectedMember.chapter}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Zone:</span>
          <span className="text-gray-700">{selectedMember.zone}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Election Date:</span>
          <span className="text-gray-700">{selectedMember.date_of_election}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">License Status:</span>
          <span className={`px-2 py-1 rounded ${selectedMember.license_status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {selectedMember.license_status}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-center space-x-2 bg-blue-50 p-3 rounded-lg">
          <BiPhoneIncoming className="w-5 h-5 text-blue-600" />
          <span className="text-blue-600 font-medium">
            {selectedMember.phone || "Not available"}
          </span>
        </div>
      </div>
    </div>
  )}
</Modal>
    </div>
  );
};

export default MemberDashboardPage;
