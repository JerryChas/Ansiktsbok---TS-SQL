import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import createResolvers from "./resolvers.js";
import pool from "./config/database.js";
// import updateDatabase from "./config/tempSql.js";

const resolvers = createResolvers(pool);

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at: ${url}`);
    // updateDatabase() /* - används för temporär SQL-inmatning */
});
