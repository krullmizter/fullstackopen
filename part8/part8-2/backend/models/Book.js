import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  yearPublished: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  genres: [
    {
      type: String,
    },
  ],
});

bookSchema.plugin(uniqueValidator);

export const Book = mongoose.model("Book", bookSchema);
