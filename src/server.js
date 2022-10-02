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
  // app.use(cors({
  //   origin: "*",
  //   credentials: true,
  //   methods: ["GET", "POST", "PUT", "DELETE"]
  // }));
  mongoose.connect(`${process.env.MONGO_URI}`);
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB connection established 🚀");
  });

  //creating apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
  server.applyMiddleware({
    app,
    cors: {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
    path: "/api",
  });
  app.listen(PORT, () => {
    console.log(`🚀 server started on http://localhost:${PORT}`);
  });
})();
