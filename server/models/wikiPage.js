import mongoose from 'mongoose';

const wikiPageSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    lastEdited: { type: Date, default: Date.now }
})

export const WikiPage =
  mongoose.models.WikiPage ||
  mongoose.model("WikiPage", wikiPageSchema);