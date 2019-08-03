  const { ApolloServer, gql } = require('apollo-server');
  const collection = require('./collection')
  const typeDefs = gql`
    type Item {
      input: String,
      output: String
    }
  
    type Query {
      items: [Item]
    }
  `;

  const resolvers = {
    Query: {
      items: () => collection,
    },
  };

 const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: process.env.ENGINE_API_KEY && {
      apiKey: process.env.ENGINE_API_KEY,
    },
  });

  server.listen().then(({ url }) => {
    console.log(` Server ${url}`);
  });
