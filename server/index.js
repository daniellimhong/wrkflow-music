import express from "express";
import mongoose from "mongoose";
import expressGraphQL from "express-graphql";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
require("dotenv").config();

const { SERVER_PORT, DATABASE_STRING } = process.env;

const startServer = async () => {
  const app = express();

    app.use(
      "/graphql",
      expressGraphQL({
        schema: typeDefs,
        rootValue: resolvers,
        graphiql: true,
      })
    );

  await mongoose.connect(DATABASE_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.listen(SERVER_PORT, () => {
    console.log(
      `Server ready at http://localhost:${SERVER_PORT}/graphql`
    );
  });
};

startServer();
