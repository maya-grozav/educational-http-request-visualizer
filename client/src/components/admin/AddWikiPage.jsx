import axios from "axios";
import React, { useState } from "react";

const AddWikiPage = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [res, setRes] = useState("");

  const addWikiPage = async () => {
    try {
        const response = await axios.post(`http://localhost:3001/api/wiki/`, {slug, title, content});
        console.log(response)
        setRes(response.data.message);
    } catch (error) {
        setRes(error);
    }

  }
  return (
    <div className="flex flex-col gap-10 bg-gray-950 p-5 px-10 justify-center items-center">
      <label className="flex flex-col">
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border dark:border-gray-100 rounded-md w-full"
        />
      </label>
      <label className="flex flex-col">
        Slug
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border dark:border-gray-100 rounded-md"
        />
      </label>
      <label className="flex flex-col">
        Content
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border dark:border-gray-100 rounded-md"
        />
      </label>
      <button onClick={addWikiPage} className="bg-gray-500 p-3 px-7 w-fit rounded-md">Add</button>
    <div className="dark:text-gray-100 font-bold">{res}</div>
    </div>
  );
};

export default AddWikiPage;
