import React, { useEffect, useState } from "react";
import { useBrowser } from "../../../../contexts/BrowserContext";
import axios from "axios";
import parse from "html-react-parser";
import Spinner from "../../../common/Spinner";

const WikiPage = ({ url, id }) => {
  const { changeTitle, addRequest, state } = useBrowser();
  const WIKI_URL = "http://webwiki.com";
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSlug = () => {
      let slug = url.slice(WIKI_URL.length);
      if (slug.length > 0) {
        slug = slug.slice(1);
        return slug;
      } else {
        return "home";
      }
    };

    const fetchPage = async () => {
      const slug = getSlug();

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:3001/api/wiki/${slug}`,
        );
        setPage(response.data);
        console.log(response);
        addRequest(response);
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [url, state.refresh]);

  useEffect(() => {
    if (page) changeTitle(page.title, id);
  }, [page]);

  return (
    <div className="w-full h-[80vh] bg-gray-100 dark:bg-gray-900 dark:text-gray-100 overflow-y-auto">
      {loading ? (
        <Spinner />
      ) : (
        <iframe
          srcDoc={page?.content || ""}
          className="w-full h-full bg-white dark:bg-gray-900"
          style={{ border: "none" }}
          sandbox="allow-same-origin allow-scripts"
        />
      )}
    </div>
  );
};

export default WikiPage;
