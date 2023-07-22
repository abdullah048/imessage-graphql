import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import cors from 'cors';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { GraphQlContext, Session } from './utils/types';

const prisma = new PrismaClient();
interface MyContext {
  token?: String;
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const getServerSession = async (cookie: string): Promise<Session> => {
  const res = await fetch('http://localhost:3000/api/auth/session', {
    headers: { cookie },
  });
  const session = await res.json();
  return session;
};

const main = async () => {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQlContext> => {
        const session = await getServerSession(req.headers.cookie as string);
        return { session, prisma };
      },
    })
  );

  await new Promise<void>(resolve =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main().catch((error: Error) => console.log(`main Error: ${error.message}`));
