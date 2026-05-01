import React from "react";

const getPreviewContent = (htmlContent) => {
  if (!htmlContent) return "Fără previzualizare.";

  const stripped = htmlContent.replace(/<[^>]+>/g, " ");
  const preview = stripped.trim().slice(0, 60);

  return preview.length === 60 ? preview + "…" : preview;
};

const RequestMiniCard = ({ action, responseData }) => {
  if (!responseData?.data) {
    return (
      <div className="p-3 rounded-md bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
        Date invalide.
      </div>
    );
  }

  const { data, status, statusText } = responseData;
  const method = responseData.config?.method?.toUpperCase() || "GET";

  const isSuccess = status >= 200 && status < 300;
  const previewText = getPreviewContent(data.content);

  return (
    <div
      onClick={action}
      className="
        w-full cursor-pointer rounded-lg border
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        p-4
        hover:bg-gray-50 dark:hover:bg-gray-800
        transition
      "
    >
      <div className="flex items-center gap-3">
        <span
          className={`
            px-2 py-0.5 rounded text-xs font-semibold
            ${isSuccess
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"}
          `}
          title={`${status} ${statusText}`}
        >
          {status}
        </span>

        <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
          {data.title || "Fără titlu"}
        </h3>
      </div>

      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 truncate">
        <span className="font-mono mr-2 text-xs uppercase">{method}</span>
        {previewText}
      </div>

      <div className="mt-2 text-xs font-mono text-gray-500 dark:text-gray-500 truncate">
        {data.slug || "-"}
      </div>
    </div>
  );
};

export default RequestMiniCard;
