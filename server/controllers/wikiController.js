import { WikiPage } from "../models/wikiPage.js";

export const addWikiPage = async (req, res) => {
  try {
    const { slug, title, content } = req.body;

    if (!slug || !title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newWikiPage = new WikiPage({
      slug,
      title,
      content,
    });

    await newWikiPage.save();

    res.status(201).json({ message: "Wiki page added successfully" });
  } catch (error) {
    console.log("Error adding a wiki page: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getWikiPage = async (req, res) => {
  try {
    const { topic } = req.params;

    const page = await WikiPage.findOne({ slug: topic });

    if (!page) {
      const pageNotFound = await WikiPage.findOne({slug: "page-not-found"})
      return res.status(200).json(pageNotFound);
    }

    res.status(200).json(page);
  } catch (error) {
    console.error("Error fetching wiki page:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
