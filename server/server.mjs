import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import { schemas } from "./schemas/index.js";
import { authMiddleware } from "./utils/auth.js";
import { runDBClient } from "./connection/index.js";


const app = express();
const httpServer = http.createServer(app);

const { typeDefs, resolvers } = schemas;
const server = new ApolloServer({
  // The GraphQL schema
  typeDefs,
  // A map of functions which return data for the schema.
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

runDBClient().catch(console.dir);

await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: authMiddleware,
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);