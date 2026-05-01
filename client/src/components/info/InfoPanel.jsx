import React from "react";
import { useBrowser } from "../../contexts/BrowserContext";
import RequestMiniCard from "./RequestMiniCard";

const InfoPanel = () => {
  const { state, changeActiveRequestIndex } = useBrowser();
  const { requests } = state;
  return (
    <div
      className="w-[90vw] lg:w-[40vw] min-w-[40vw] h-[80vh]
                bg-gray-100 dark:bg-gray-900 dark:text-gray-100
                border rounded-md overflow-hidden
                flex flex-col"
    >
      <div
        className="text-gray-900 bg-gray-200 dark:text-gray-100 dark:bg-gray-800
                  w-full p-5 font-bold text-lg shrink-0"
      >
        Info Panel
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-5">
        {requests.map((req, i) => (
          <RequestMiniCard
            key={i}
            action={() => changeActiveRequestIndex(i)}
            responseData={req}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoPanel;
