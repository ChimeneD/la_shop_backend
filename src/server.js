const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { schema } = require("./graphql/schema");
const { rootResolver } = require("./graphql/resolvers");
const { ApolloServer } = require("apollo-server-express");

const dotenv = require("dotenv");
(async () => {
  dotenv.config();
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  mongoose.connect(`${process.env.MONGO_URI}`);
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB connection established 🚀");
  });

  //creating apollo server
  const server = new ApolloServer({
    schema,
    rootResolver,
    introspection: true,
    formatError: (error) => {
      return error;
    },
    graphiql: true,
    context: ({ req, res }) => {
      return {
        req,
        res
      };
    }
  });
  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  //run the server
  app.get("/", (req, res) => {
    res.send("Express + TypeScript Server is running on port => " + PORT);
  });
  // app.use(
  //   "/api",
  //   graphqlHTTP((req, res) => {
  //     return {
  //       schema: schema,
  //       rootValue: rootResolver,
  //       graphiql: true,
  //       customFormatErrorFn: (error) => {
  //         return error;
  //       },
  //       context: {
  //         req: req,
  //         res: res
  //       }
  //     };
  //   })
  // );
  app.listen(PORT, () => {
    console.log(`🚀 server started on http://localhost:${PORT}`);
  });
})();
