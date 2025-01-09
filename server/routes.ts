import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { validateAuthToken } from "./middleware/auth";
import { GraphQLError } from "graphql";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Create Apollo Server instance
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (error) => {
      if (error.message.includes("Authorization")) {
        return new GraphQLError(error.message, {
          extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
        });
      }
      return error;
    },
  });

  // Start Apollo Server
  await apolloServer.start();

  // Apply Apollo middleware to /api/graphql endpoint with auth check
  app.use(
    "/api/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        try {
          // Validate auth token
          validateAuthToken(req);
          return { req };
        } catch (error) {
          throw new GraphQLError(error instanceof Error ? error.message : "Unauthorized", {
            extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
          });
        }
      },
    })
  );

  return httpServer;
}