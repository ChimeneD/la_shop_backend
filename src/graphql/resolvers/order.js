const { User } = require("../../models/user.model");
const { Order } = require("../../models/order.model");
const { getProduct, getUser } = require("./merged");

exports.orderQuery = {
  allOrders: async () => { 
    try {
      const orders = await Order.find({});
      const result = orders.map((order) => {
        return {
          ...order._doc,
          _id: order.id,
          items: order.items.map((item) => {
            return {
              ...item._doc,
              _id: item.id,
              product: getProduct.bind(this, item.product),
            };
          }),
          user: getUser.bind(this, order.user),
        };
      });

      return result;
    }catch(err){
      throw err
    }
  },
  orders: async (_, args) => {
    try {
      const orders = await Order.find({ user: { $in: args.user } });
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
  order: async (_, args) => {
    try {
      const order = await Order.findById(args.id);
      const result = {
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
      return result;
    } catch (err) {
      throw err;
    }
  },
};

exports.orderMutation = {
  createOrder: async (parent, args) => {
    try {
      const order = new Order({
        items: args.item,
        address: args.address,
        user: args.user,
        name: args.name,
        totalPrice: args.totalPrice,
        paymentMethod: args.paymentMethod,
      });
      const result = await order.save();
      // find user in the database
      const findUser = await User.findById(args.user);
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
  },
};
