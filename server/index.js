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
const PORT = process.env.PORT || 4000;
const { typeDefs, resolvers } = schemas;


const server = new ApolloServer({
  // The GraphQL schema
  typeDefs,
  // A map of functions which return data for the schema.
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});



export const StartApolloServer = async (runDBClient, server) => {
  runDBClient().catch(console.dir);

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

  return console.log(`🚀 Server ready at ${{PORT}}`);
};

StartApolloServer(runDBClient, server);




