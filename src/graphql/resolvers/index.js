const { authQuery, authMutation } = require("./auth");
const { categoryQuery, categoryMutation } = require("./categories");
const { orderQuery, orderMutation } = require("./order");
const { productQuery, productMutation } = require("./product")


exports.resolvers = {
  Query: {
    ...authQuery,
    ...categoryQuery,
    ...productQuery,
    ...orderQuery
  },
  Mutation: {
    ...authMutation,
    ...categoryMutation,
    ...productMutation,
    ...orderMutation
  }
};
