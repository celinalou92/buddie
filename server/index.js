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


const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);
const { typeDefs, resolvers } = schemas;

const serverListen = async (PORT) => {
  httpServer.listen({ port: PORT })
  return console.log(`🚀 Server ready at ${PORT}`);
}

const StartApolloServer = async () => {
  
  console.log(`Starting Server`);

  const server = new ApolloServer({
    // The GraphQL schema
    typeDefs,
    // A map of functions which return data for the schema.
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start().catch(console.dir);

  app.use(
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




