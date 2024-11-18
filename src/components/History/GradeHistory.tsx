import React from "react";

const GradeHistory = () => {
  const gradeData = [
    { sn: 1, grade: "Fellow", date: "31st-August-2021" },
    { sn: 2, grade: "Corporate Member", date: "31st-August-2021" },
    { sn: 3, grade: "Graduate Member", date: "31st-August-2021" },
  ];

  return (
    <div className="bg-white">
      <h2 className="text-xl px-4 py-2 font-semibold mb-4">Grade History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="p-4 whitespace-nowrap text-left">S/N</th>
              <th className="p-4 whitespace-nowrap text-left">Grade</th>
              <th className="p-4 whitespace-nowrap text-left">Date Conferred</th>
            </tr>
          </thead>
          <tbody>
            {gradeData.map((item) => (
              <tr
                key={item.sn}
                className="border-b"
              >
                <td className="p-4 whitespace-nowrap">{item.sn}</td>
                <td className="p-4 whitespace-nowrap">{item.grade}</td>
                <td className="p-4 whitespace-nowrap">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
