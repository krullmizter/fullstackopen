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
const PORT = 4000;

if (!MONGODB_URI || !JWT_SECRET) {
  console.error("Missing one or more environment variables");
  process.exit(1);
}

const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(MONGODB_URI, {});
      console.log("Successfully connected to DB");
      break;
    } catch (error) {
      console.error(
        `Error connecting to DB (Retries left: ${retries}):`,
        error.message
      );
      retries -= 1;
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
  if (!retries) {
    console.error("Exhausted all retries. Exiting...");
    process.exit(1);
  }
};

const startApollo = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req.headers.authorization || "";
      let currentUser = null;

      if (auth.toLowerCase().startsWith("bearer ")) {
        const token = auth.substring(7);

        try {
          const decodedToken = jwt.verify(token, JWT_SECRET);
          currentUser = await User.findById(decodedToken.id);
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            console.warn("Token expired:", error.message);
          } else {
            console.error("Token verification failed:", error.message);
          }
        }
      }
      return { currentUser };
    },
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  server
    .listen({ port: PORT, path: "/graphql" })
    .then(({ url }) => {
      console.log(`Server ready at ${url}graphql`);
    })
    .catch((error) => {
      console.error("Error starting the Apollo server:", error.message);
      gracefulShutdown();
    });

  const gracefulShutdown = async () => {
    console.log("Starting graceful shutdown...");
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
      process.exit(0);
    }
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
};

startApollo();
