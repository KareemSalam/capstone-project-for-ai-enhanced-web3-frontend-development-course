const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

// Define the GraphQL schema
const typeDefs = gql`
    type Query {
        prices: Prices
    }

    type Prices {
        bitcoin: Float
        ethereum: Float
        solana: Float
    }
`;

// Define the resolvers
const resolvers = {
    Query: {
        prices: async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
            const data = await response.json();
            return {
                bitcoin: data.bitcoin.usd,
                ethereum: data.ethereum.usd,
                solana: data.solana.usd,
            };
        },
    },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
