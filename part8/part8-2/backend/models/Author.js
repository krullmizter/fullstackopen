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
    min: 1000,
    max: new Date().getFullYear(),
    default: null,
  },
  bookCount: {
    type: Number,
    default: 0,
  },
});

authorSchema.plugin(uniqueValidator);

export const Author = mongoose.model("Author", authorSchema);
