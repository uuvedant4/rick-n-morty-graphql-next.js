import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";

const URI = "https://rickandmortyapi.com/api/character";

const typeDefs = gql`
  type Alien {
    id: ID!
    name: String
    image: String
  }
  type Query {
    aliens: [Alien]
  }
`;

const resolvers = {
  Query: {
    aliens: async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const { results } = await response.json();
      return results;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
