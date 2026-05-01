import React from "react";

const NoSearchResults = ({ query }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="text-4xl mb-4">=(</div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        No results found
      </h2>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md">
        We couldn’t find anything matching{" "}
        {query && <span className="font-medium">“{query}”</span>}.  
        Try a different keyword or a broader search.
      </p>
    </div>
  );
};

export default NoSearchResults;
