import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Create Apollo Server instance
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable schema introspection for development
  });

  // Start Apollo Server
  await apolloServer.start();

  // Apply Apollo middleware to /api/graphql endpoint
  app.use(
    "/api/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  return httpServer;
}