import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema as schemaPublic } from './graphql';

const server = new ApolloServer({ schema: schemaPublic });

  const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
