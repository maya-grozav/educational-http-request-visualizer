import React, { useState } from "react";
import { useBrowser } from "../../../../contexts/BrowserContext.jsx";
const SearchHome = () => {
  const [query, setQuery] = useState("");
  const { navigate } = useBrowser();

  const search = (searchedText) => {
    if (!searchedText) return "https://webpeek.com/";

    const query = String(searchedText).trim().replace(/\s+/g, "+");

    navigate(`https://webpeek.com/search?q=${query}`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end p-6">
        <button
          onClick={() => navigate("https://webpeek.com/login")}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:underline"
        >
          Login
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          WebPeek
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
          Search through web pages, technical documentation, and structured
          knowledge — fast and simple.
        </p>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web…"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(query);
            }
          }}
          className="
              w-1/2 rounded-full border border-gray-300 dark:border-gray-700
              px-6 py-3 text-base
              bg-white dark:bg-gray-900
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
        />

        <div className="mt-6 text-xs text-gray-400 dark:text-gray-500">
          Try searching for “HTTP status codes” or “HTTP Cookies”
        </div>
      </div>
    </div>
  );
};

export default SearchHome;
