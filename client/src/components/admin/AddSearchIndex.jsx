import axios from "axios";
import React, { useState } from "react";

const AddSearchIndex = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState();
  const [res, setRes] = useState("");

  const addSearchIndex = async () => {
     try {
        const response = await axios.post(`http://localhost:3001/api/search/`, {url, title, content, tags});
        console.log(response)
    } catch (error) {
        console.log(error)
    }
  };
  const addTag = () => {
    if (tagValue == "") return;
    setTags((prev) => [...prev, tagValue]);
    setTagValue("");
  };
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
        URL
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
      <label className="flex flex-col">
        Tags
        <input
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          className="border dark:border-gray-100 rounded-md"
        />
        <button onClick={addTag}>Add</button>
      </label>
      <div>
        {tags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
      <button
        onClick={addSearchIndex}
        className="bg-gray-500 p-3 px-7 w-fit rounded-md"
      >
        Add
      </button>
      <div className="dark:text-gray-100 font-bold">{res}</div>
    </div>
  );
};

export default AddSearchIndex;
