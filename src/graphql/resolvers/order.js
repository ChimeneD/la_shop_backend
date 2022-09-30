const { User } = require("../../models/user.model");
const { Order } = require("../../models/order.model");
const { getProduct, getUser } = require("./merged");

exports.orderResolver = {
  orders: async (args) => {
    try {
      const orders = await Order.find({ user: { $in: args.orderInput.user } });
      const result = orders.map((order) => {
        return {
          ...order._doc,
          _id: order.id,
          items: order.items.map((item) => {
            return {
              ...item._doc,
              _id: item.id,
              product: getProduct.bind(this, item.product)
            };
          }),
          user: getUser.bind(this, order.user)
        };
      });

      return result;
    } catch (err) {
      throw err;
    }
  },
  createOrder: async (args) => {
    try {
      const order = new Order({
        items: args.orderInput.items,
        address: args.orderInput.address,
        user: args.orderInput.user
      });
      const result = await order.save();
      // find user in the database
      const findUser = await User.findById(args.productInput.user);
      // check if it doesn't exists
      if (!findUser) {
        throw new Error("User does not exist in database");
      }
      // push the product ID to the find user collection
      await findUser.orders.push(order);
      await findUser.save();
      return { ...result._doc, _id: result._doc._id.toString() };
    } catch (error) {
      throw error;
    }
  }
};
