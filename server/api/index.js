import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { schemas } from "../schemas/index.js";
import { authMiddleware } from "../utils/auth.js";
import { runDBClient } from "../connection/index.js";

const app = express();
export const httpServer = http.createServer(app);
const { typeDefs, resolvers } = schemas;
const PORT = process.env.PORT || 4000;

const serverListen = (PORT) => {
  httpServer.listen({ port: PORT });
  if (!PORT) {
    throw new Error("No Port Set!");
  }
  return console.log("🚀 Apollo Server ready at port: ", PORT);
};

const StartApolloServer = async () => {
  console.log(`Starting Apollo Server`);
  const server = new ApolloServer({
    // The GraphQL schema
    typeDefs,
    // A map of functions which return data for the schema.
    resolvers,
    playground: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start().catch((error) => console.log(error.message));
  
  app.use(
    "/",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    })
);
};

runDBClient();
StartApolloServer();
serverListen(PORT);

export default StartApolloServer;