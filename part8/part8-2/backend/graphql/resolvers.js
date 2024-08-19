import { AuthenticationError, UserInputError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";
import { User } from "../models/User.js";
import dotenv from "dotenv";
import process from "process";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

export const resolvers = {
  Query: {
    allAuthors: async () => {
      return Author.find({});
    },
    allBooks: async () => {
      const books = await Book.find({}).populate("author");
      return books.map((book) => ({
        ...book.toObject(),
        id: book._id.toString(),
        author: {
          ...book.author.toObject(),
          id: book.author._id.toString(),
        },
      }));
    },
    recommendedBooks: async (parent, args, context) => {
      const user = context.currentUser;
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const books = await Book.find({ genres: user.favoriteGenre }).populate(
        "author"
      );

      return books.map((book) => ({
        ...book.toObject(),
        id: book._id.toString(),
        author: {
          ...book.author.toObject(),
          id: book.author._id.toString(),
        },
      }));
    },
  },
  Mutation: {
    loginUser: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user._id.toString(), username: user.username },
        JWT_SECRET
      );
      return { user, token };
    },
    registerUser: async (parent, { username, password, favoriteGenre }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new UserInputError("Username is already taken");
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ username, passwordHash, favoriteGenre });
      await user.save();

      const token = jwt.sign(
        { id: user._id.toString(), username: user.username },
        JWT_SECRET
      );

      return { user, token };
    },
    addBook: async (parent, { title, author, yearPublished, genres }) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        let authorObj = await Author.findOne({ name: author }).session(session);
        if (!authorObj) {
          authorObj = new Author({ name: author });
          await authorObj.save({ session });
        }

        authorObj.bookCount += 1;
        await authorObj.save({ session });

        const book = new Book({
          title,
          author: authorObj._id,
          yearPublished,
          genres,
        });

        await book.save({ session });
        await session.commitTransaction();
        await book.populate("author");

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return {
          ...book.toObject(),
          id: book._id.toString(),
          author: {
            ...book.author.toObject(),
            id: book.author._id.toString(),
          },
        };
      } catch (error) {
        await session.abortTransaction();
        throw new Error("Failed to add book");
      } finally {
        session.endSession();
      }
    },
    editAuthor: async (parent, { name, setBornTo }) => {
      const author = await Author.findOne({ name });
      if (!author) {
        throw new UserInputError("Author not found");
      }
      author.born = setBornTo;
      await author.save();
      return author;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};
