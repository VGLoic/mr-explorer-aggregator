import { ApolloServer, ServerInfo } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { dataSources } from "./dataSources";
import { contextFunction } from "./context/context";

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: contextFunction,
});

server.listen().then(({ url }: ServerInfo) => {
  console.log(`🚀  Server ready at ${url}`);
});
