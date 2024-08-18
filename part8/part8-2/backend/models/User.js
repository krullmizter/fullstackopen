import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    index: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
    enum: ["Science Fiction", "Fantasy", "Non-fiction", "Horror", "Romance"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

export const User = mongoose.model("User", userSchema);
