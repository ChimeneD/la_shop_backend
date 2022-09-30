const { authResolver } = require("./auth");
const { categoryResolver } = require("./categories");
const { orderResolver } = require("./order");
const { productResolver } = require("./product.inventory");

exports.rootResolver = {
  ...authResolver,
  ...categoryResolver,
  ...productResolver,
  ...orderResolver
};
