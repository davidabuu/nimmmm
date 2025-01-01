import React from "react";

const Confirmation = () => {
  return (
    <div className="border border-primary rounded-lg p-6 bg-white shadow-md">
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <span className="text-green-500 text-xl">✔</span>
          <p className="text-gray-800">
            Must have spent <strong>3 years</strong> on the grade of Graduate.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-green-500 text-xl">✔</span>
          <p className="text-gray-800">
            Be financially up to date (paid up all outstanding subscription).
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-green-500 text-xl">✔</span>
          <div className="text-gray-800">
            <p>
              Must have <strong>15 credit points</strong> which can be gotten
              from:
            </p>
            <ul className="list-disc pl-6 text-gray-800">
              <li>
                <strong>
                  Mandatory Continuing Professional Education Programme (MCPEP)
                </strong>{" "}
                - 5 credit points
              </li>
              <li>
                <strong>Annual National Management Conference (ANMC)</strong> -
                10 credit points
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Confirmation;
