import React, { useEffect, useState } from "react";
import { useBrowser } from "../../contexts/BrowserContext.jsx";

const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const Meta = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-gray-400 uppercase tracking-wide">
      {label}
    </span>
    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
      {value || "-"}
    </span>
  </div>
);

const formatBytes = (bytes) => {
  if (!bytes || isNaN(bytes)) return "-";
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
};

const isSecureUrl = (url) => {
  if (!url) return "-";
  return url.startsWith("https") ? "Secure (HTTPS)" : "Not secure (HTTP)";
};

const cacheInfo = (headers) => {
  const cc = headers?.["cache-control"];
  if (!cc) return "No cache info";
  if (cc.includes("no-cache") || cc.includes("no-store")) return "Always fresh";
  return "May be cached";
};

const RequestCard = ({ responseData }) => {
  const { openSearch } = useBrowser();
  if (!responseData?.data) return null;

  const { data, status, statusText, headers, config } = responseData;

  const ok = status >= 200 && status < 300;

  const [button, setButton] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseUp = (e) => {
      e.preventDefault();
      const selection = window.getSelection();

      if (!selection || selection.isCollapsed) {
        setButton((b) => ({ ...b, visible: false }));
        return;
      }

      const text = selection.toString().trim();
      if (!text) {
        setButton((b) => ({ ...b, visible: false }));
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setButton({
        visible: true,
        text,
        x: rect.left + rect.width / 2,
        y: rect.top - 36,
      });
    };

    document.addEventListener("contextmenu", handleMouseUp);
    return () => document.removeEventListener("contextmenu", handleMouseUp);
  }, []);

  const doAction = (text) => {
    openSearch(text);
    console.log("Selected text:", text);
  };

  return (
    <div className="relative">
      <div className="w-full rounded-xl bg-white dark:bg-gray-900 px-8 py-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 leading-tight">
            {data.title || "Untitled page"}
          </h1>

          <span
            className={`
            px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
            ${
              ok
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
            }
          `}
          >
            {status} {statusText}
          </span>
        </div>

        <div className="flex flex-wrap gap-6">
          <Meta label="Slug" value={data.slug} />
          <Meta label="Last edited" value={formatDate(data.lastEdited)} />
          <Meta label="Content type" value={headers?.["content-type"] || "-"} />

          <Meta label="Request type" value={config?.method?.toUpperCase()} />
          <Meta
            label="Page size"
            value={formatBytes(headers?.["content-length"])}
          />
          <Meta label="Security" value={isSecureUrl(config?.url)} />
          <Meta label="Caching" value={cacheInfo(headers)} />
          <Meta label="Server" value={headers?.server || "Unknown"} />
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-5 text-sm text-gray-800 dark:text-gray-200 max-h-72 overflow-auto leading-relaxed">
          {data.content || "No content"}
        </div>

        
        {button.visible && (
          <button
            className="bg-white px-3 py-1 text-gray-900 rounded-m cursor-pointer"
            style={{
              position: "fixed",
              top: button.y,
              left: button.x,
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => doAction(button.text)}
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
