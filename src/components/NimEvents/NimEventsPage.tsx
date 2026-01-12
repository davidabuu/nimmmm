import React from "react";

import Events from "./Events";

const NimEventsPage: React.FC = () => {
  return (
    <div className="mx-10">
      {/* Notification Icon */}
     
      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        NIM Events
      </h2>
      <div>
        <div className=" ">
          <div className="bg-white  p-4">
            <Events />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NimEventsPage;
