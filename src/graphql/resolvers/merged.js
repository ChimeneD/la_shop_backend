const { Category } = require("../../models/category.model");
const { Inventory } = require("../../models/inventory.model");
const { Product } = require("../../models/product.model");
const { User } = require("../../models/user.model");
const { Order } = require("../../models/order.model");
const { Brand } = require("../../models/brand.model");

exports.getBrand = async (_id) => {
  try {
    const brand = await Brand.findById(_id);
    let result = {
      ...brand._doc,
      _id: brand.id,
      products: getProducts.bind(this, brand.products)
    };
    return result;
  } catch (err) {
    throw err;
  }
};
exports.getCategory = async (_id) => {
  try {
    const category = await Category.findById(_id);
    let result = {
      ...category._doc,
      _id: category.id,
      products: getProducts.bind(this, category.products)
    };
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getInventories = async (_ids) => {
  try {
    const inventories = await Inventory.find({ _id: { $in: _ids } });

    let result = inventories.map((inventory) => {
      return {
        ...inventory._doc,
        _id: inventory.id,
        product: this.getProduct.bind(this, inventory.product)
      };
    });

    return result;
  } catch (err) {
    throw err;
  }
};

exports.getOrders = async (_ids) => {
  try {
    const orders = await Order.find({
      _id: { $in: _ids }
    });
    const result = orders.map((order) => {
      return {
        ...order._doc,
        _id: order.id,
        items: order.items.map((item) => {
          return {
            ...item._doc,
            _id: item.id,
            product: this.getProduct.bind(this, item.product)
          };
        }),
        user: getUser.bind(this, order.user)
      };
    });

    return result;
  } catch (err) {
    throw err;
  }
};

exports.getProduct = async (_id) => {
  try {
    const product = await Product.findById(_id);
    let result = {
      ...product._doc,
      _id: product.id,
      brand: this.getBrand.bind(this, product.brand), // use the get brand function
      category: this.getCategory.bind(this, product.category), // use the get category function
      inventory: getInventories.bind(this, product.inventory),
    };
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getProducts = async (_ids) => {
  try {
    const products = await Product.find({
      _id: { $in: _ids }
    });
    let result = products.map((product) => {
      return {
        ...product._doc,
        _id: product.id,
        brand: this.getBrand.bind(this, product.brand), // use the get category function
        category: this.getCategory.bind(this, product.category), // use the get category function
        inventory: getInventories.bind(this, product.inventory),
      };
    });
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getUser = async (_id) => {
  try {
  } catch (err) {
    throw err;
  }
};
