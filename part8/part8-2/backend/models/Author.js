import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
  },
  born: {
    type: Number,
    default: null,
  },
  bookCount: {
    type: Number,
    default: 0,
  },
});

authorSchema.plugin(uniqueValidator);

export const Author = mongoose.model("Author", authorSchema);
