import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  yearPublished: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear(),
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Book = mongoose.model("Book", bookSchema);
