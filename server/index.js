import express from "express";
import mongoose from "mongoose";
import expressGraphQL from "express-graphql";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import auth from './middleware/auth';
require("dotenv").config();

const { SERVER_PORT, DATABASE_STRING } = process.env;

const startServer = async () => {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
  
  app.use(auth); //! may have to move
  
  app.use(
    "/graphql",
    expressGraphQL({
      schema: typeDefs,
      rootValue: resolvers,
      graphiql: true,
      customFormatErrorFn(err){
          if (!err.originalError){
              return err;
          } 
          const data = err.originalError.data;
          const message = err.message || "An error occured";
          const code = err.originalError.code || 500;
          return { message: message, status: code, data: data }
      }
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
