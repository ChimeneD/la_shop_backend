const { authQuery, authMutation } = require("./auth");
const { categoryQuery, categoryMutation } = require("./categories");
const { orderResolver } = require("./order");
const { productQuery, productMutation } = require("./product.inventory");


exports.resolvers = {
  Query: {
    ...authQuery,
    ...categoryQuery,
    ...productQuery
  },
  Mutation: {
    ...authMutation,
    ...categoryMutation,
    ...productMutation
  }
};
