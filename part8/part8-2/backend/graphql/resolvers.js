import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import process from "process";
import { UserInputError, AuthenticationError } from "apollo-server-errors";
import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";
import { User } from "../models/User.js";

dotenv.config();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, {
    expiresIn: "5h",
  });
};

export const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) query.author = author._id;
      }

      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }

      return Book.find(query).populate("author");
    },
    recommendedBooks: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("You must be logged in");
      }

      return Book.find({
        genres: { $in: [context.currentUser.favoriteGenre] },
      }).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
    loggedInUser: (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("You must be logged in");
      }
      return context.currentUser;
    },
  },
  Mutation: {
    registerUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, SALT_ROUNDS);
      const user = new User({ ...args, passwordHash });

      try {
        await user.save();
        return user;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    loginUser: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      console.log(user);

      if (!user || !(await bcrypt.compare(args.password, user.passwordHash))) {
        throw new UserInputError("Invalid credentials");
      }

      return { value: generateToken(user), user: user };
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
      }

      author.bookCount = (author.bookCount || 0) + 1;

      try {
        await author.save();

        const book = new Book({ ...args, author: author._id });
        await book.save();

        return book.populate("author");
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
        throw new Error("An unexpected error occurred.");
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new UserInputError("Author not found");
      }

      author.born = args.setBornTo;

      try {
        await author.save();
        return author;
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
        throw new Error("An unexpected error occurred.");
      }
    },
  },
};
