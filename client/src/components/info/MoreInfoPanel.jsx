import React from "react";
import { useBrowser } from "../../contexts/BrowserContext";
import RequestCard from "./requestCard";

const MoreInfoPanel = () => {
  const { state } = useBrowser();
  const { requests, activeRequestIndex } = state;

  if (!requests[activeRequestIndex]) return null;

  return (
    <div className="w-[90vw]">
      <div className='dark:text-gray-100 bg-gray-800 w-full p-5 font-bold text-lg '>More Info Panel</div>
        
      <RequestCard responseData={requests[activeRequestIndex]} />
    </div>
  );
};

export default MoreInfoPanel;
