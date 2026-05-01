import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import { useBrowser } from "../../../../contexts/BrowserContext.jsx";
import { useAuth } from "../../../../contexts/AuthContext.jsx";
import { api } from "../../../../lib/api.js";
import NoSearchResults from "./NoSearchResults.jsx";

const SearchResult = ({ searchedText }) => {
  const { state, navigate } = useBrowser();
  const [searchedValue, setSearchedValue] = useState(searchedText);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [overview, setOverview] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const search = async () => {
      if (!searchedText) return;

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/search/search?q=${searchedText}`);
        setResults(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const fetchStream = async () => {
      if (!searchedText) return;

      setOverview("");

      const response = await fetch(
        `http://localhost:3001/api/ai/stream?q=${searchedText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 403 || !response.ok || !response.body) {
        setOverview("You need a premium account to unlock the AI overview.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setOverview((prev) => prev + chunk);
      }
    };

    search();
    fetchStream();
  }, [state.refreshKey]);

  const search = (searchedText) => {
    if (!searchedText) return "https://webpeek.com/";

    const query = String(searchedText).trim().replace(/\s+/g, "+");

    navigate(`https://webpeek.com/search?q=${query}`);
  };

  return (
    <div className="p-5 px-10 w-full h-full flex flex-col overflow-auto overflow-x-hidden">
      <input
        value={searchedValue}
        onChange={(e) => setSearchedValue(e.target.value)}
        className="border rounded-full p-2 px-5"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search(searchedValue);
          }
        }}
      />
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6 space-y-4 m-5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            AI Overview
          </h2>
        </div>

        <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {overview || "No overview available."}
        </div>
      </div>
      {loading ? (
        "Loading"
      ) : results.length === 0 ? (
        <NoSearchResults />
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {results.map((r) => (
            <SearchResultCard
              title={r.title}
              url={r.url}
              key={r.url}
              content={r.content}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
