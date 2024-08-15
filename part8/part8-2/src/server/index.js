import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();

  app.use(cors());

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(
      `Server running locally at: http://localhost:4000${server.graphqlPath}`
    )
  );
};

startServer();
