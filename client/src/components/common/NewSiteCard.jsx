const NewSiteCard = ({ siteUrl, slug, title, content, tags = [] }) => {
  const fullUrl = `${siteUrl.replace(/\/$/, "")}/${slug.replace(/^\//, "")}`;

  return (
    <article
      className="relative rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-indigo-500 transition"
      data-indexable="true"
      data-page-url={fullUrl}
      data-page-title={title}
    >
      <h2 className="text-lg font-semibold text-white">{title}</h2>

      <p className="mt-2 text-sm text-gray-400 line-clamp-3">{content}</p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="hidden">
        <span data-index-field="url">{fullUrl}</span>
        <span data-index-field="title">{title}</span>
        <span data-index-field="content">{content}</span>

        <ul data-index-field="tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default NewSiteCard;
