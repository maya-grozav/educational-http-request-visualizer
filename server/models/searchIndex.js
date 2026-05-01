import mongoose from "mongoose";

const searchIndexSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [String],
  lastEdited: { type: Date, default: Date.now },
});

searchIndexSchema.index(
  {
    title: "text",
    content: "text",
    tags: "text",
  },
  {
    weights: {
      title: 10,
      tags: 5,
      content: 1,
    },
    name: "TextIndex",
  },
);

export const SearchIndex =
  mongoose.models.SearchIndex ||
  mongoose.model("SearchIndex", searchIndexSchema);
