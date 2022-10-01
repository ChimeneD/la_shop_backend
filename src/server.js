const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { ApolloServer } = require("apollo-server-express");

const dotenv = require("dotenv");
(async () => {
  dotenv.config();
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "*",
    }),
  );
  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type",
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });
  mongoose.connect(`${process.env.MONGO_URI}`);
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB connection established 🚀");
  });

  //creating apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: "*"
    },
    formatError: (error) => {
      return error;
    },
    context: ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
  app.listen(PORT, () => {
    console.log(`🚀 server started on http://localhost:${PORT}`);
  });
})();
