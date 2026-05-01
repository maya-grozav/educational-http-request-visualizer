import { WikiPage } from "../models/WikiPage.js";
import { SearchIndex } from "../models/searchIndex.js";

export const addSearchIndex = async (req, res) => {
  try {
    const { url, title, content, tags } = req.body;

    if (!url || !title || !content || !tags) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newSearchIndex = new SearchIndex({
      url,
      title,
      content,
      tags,
    });

    await newSearchIndex.save();

    res.status(201).json({ message: "Added succesfully" });
  } catch (error) {
    console.log("Error at adding a search index: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSearchIndex = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "You need to search some text",
      });
    }

    const results = await SearchIndex.find({ $text: { $search: q } });

    res.status(200).json({ message: "OK", data: results });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const syncWikiPagesToSearchIndex = async (req, res) => {
  try {
    const wikiPages = await WikiPage.find(
      {},
      { slug: 1, title: 1, content: 1 },
    ).lean();

    let added = 0;
    let skipped = 0;

    for (const page of wikiPages) {
      const url = `http://webwiki.com/${page.slug}`;

      const exists = await SearchIndex.exists({ url });

      if (exists) {
        skipped++;
        continue;
      }

      await SearchIndex.create({
        url,
        title: page.title,
        content: page.content,
        tags: [],
      });

      added++;
    }

    return res.json({
      totalWikiPages: wikiPages.length,
      added,
      skipped,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to sync wiki pages",
    });
  }
};
