import React, { useEffect, useState } from "react";
import { useBrowser } from "../../../contexts/BrowserContext";
import { isValidWebsite } from "../../../config/siteRegistry";

const isWebsiteOrSearch = (inputValue) => {
  if (isValidWebsite(inputValue)) return "website";
  const regex = /^(http|https|wss):\/\/[^ ]/;
  if (inputValue.match(regex)) return "website";
  return "search";
};

const AddressBar = () => {
  const { state, navigate } = useBrowser();
  const { tabs, activeTabId } = state;
  const url = tabs.find((tab) => tab.id === activeTabId).url;

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(url !== "browser://home" ? url : "");
  }, [activeTabId, url]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim()) {
        const typeOfInput = isWebsiteOrSearch(value);
        let url;
        if (typeOfInput === "search") {
          const searchedText = value.trim().replace(" ", "+");
          url = "https://webpeek.com/search?q=" + searchedText;
        } else {
          url = value;
        }
        console.log(url);
        navigate(url);
      }
    }
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search something..."
      className="w-full bg-gray-100 dark:bg-gray-700 rounded-full p-1 px-2.5 text-gray-900 dark:text-gray-100"
    />
  );
};

export default AddressBar;
