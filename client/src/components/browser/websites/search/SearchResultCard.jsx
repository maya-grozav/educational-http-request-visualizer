import React from "react";
import { useBrowser } from "../../../../contexts/BrowserContext";

const SearchResultCard = ({ url, title, content }) => {
  const { navigate } = useBrowser();

  return (
    <div
      onClick={() => navigate(url)}
      className="w-full cursor-pointer py-4"
    >
      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
        {url}
      </div>

      <div className="mt-0.5 text-xl text-blue-700 dark:text-blue-400 hover:underline">
        {title}
      </div>

      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
        {content}
      </div>
    </div>
  );
};

export default SearchResultCard;
