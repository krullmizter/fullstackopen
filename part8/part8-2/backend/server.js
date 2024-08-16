import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import process from "process";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { User } from "./models/User.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_DEVELOPMENT;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGODB_URI || !JWT_SECRET) {
  console.error("Missing one or more environment variables");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("Successfully connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  }
};

const startApollo = async () => {
  await connectDB();
  let tokenErrorLog = false;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req.headers.authorization || "";

      if (auth.toLowerCase().startsWith("bearer ")) {
        const token = auth.substring(7);

        try {
          const decodedToken = jwt.verify(token, JWT_SECRET);
          const user = await User.findById(decodedToken.id);
          if (!user) {
            console.warn("JWT Token does not match any user in the DB");
            return { currentUser: null };
          }
          return { currentUser: user };
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            if (!tokenErrorLog) {
              tokenErrorLog = true;
              console.warn("Error token expired:", error.message);
            }
            return { currentUser: null };
          }
          if (!tokenErrorLog) {
            tokenErrorLog = true;
            console.error("Token verification failed:", error.message);
          }
          return { currentUser: null };
        }
      }

      return { currentUser: null };
    },
  });

  const serverInstance = server.listen({ port: 4000 });
  serverInstance
    .then(({ url }) => {
      console.log(`Apollo server running at ${url}`);
    })
    .catch((error) => {
      console.error("Error starting the Apollo server:", error.message);
      gracefulShutdown();
    });

  const gracefulShutdown = async () => {
    console.log("\nStarting graceful shutdown...");
    try {
      if (server) {
        await server.stop();
        console.log("Apollo server stopped.");
      }
      await mongoose.connection.close();
      console.log("DB connection closed.");
    } catch (error) {
      console.error("Error during graceful shutdown:", error.message);
    } finally {
      process.exit(1);
    }
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
};

startApollo();
