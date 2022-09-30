const { Category } = require("../../models/category.model");
const { Inventory } = require("../../models/inventory.model");
const { Product } = require("../../models/product.model");
const { getCategory, getInventories, getProduct } = require("./merged");

exports.productResolver = {
  // Queries
  products: async () => {
    try {
      const data = await Product.find({});
      const result = data.map((product) => {
        return {
          ...product._doc,
          _id: product.id,
          category: getCategory.bind(this, product.category),
          inventory: getInventories.bind(this, product.inventory)
        };
      });

      return result;
    } catch (err) {
      throw err;
    }
  },
  getProduct: async (args) => {
    try {
      const product = await Product.findOne({
        slug: args.getProductInput.slug
      });
      const result = {
        ...product._doc,
        _id: product.id,
        category: getCategory.bind(this, product.category),
        inventory: getInventories.bind(this, product.inventory)
      };

      return result;
    } catch (err) {
      throw err;
    }
  },
  inventories: async () => {
    try {
      const data = await Inventory.find({});
      const result = data.map((inventory) => {
        return {
          ...inventory._doc,
          _id: inventory.id,
          product: getProduct.bind(this, inventory.product)
        };
      });

      return result;
    } catch (err) {
      throw err;
    }
  },
  productInventories: async (args) => {
    const inventories = await Inventory.find({
      product: { $in: args.productInventoryInput._id }
    });
    let result = inventories.map((inventory) => {
      return {
        ...inventory._doc,
        _id: inventory.id,
        product: getProduct.bind(this, inventory.product)
      };
    });
    return result;
  },
  // Mutations
  addProduct: async (args) => {
    try {
      const product = new Product({
        slug: args.productInput.slug,
        image: args.productInput.image,
        imageID: args.productInput.imageID,
        name: args.productInput.name,
        price: args.productInput.price,
        category: args.productInput.category,
        description: args.productInput.description,
        feature: args.productInput.feature,
        featureImage: args.productInput.featureImage,
        featureImageID: args.productInput.featureImageID
      });
      const result = await product.save();
      // find category in the database
      const findCategory = await Category.findById(args.productInput.category);
      // check if it doesn't exists
      if (!findCategory) {
        throw new Error("Category does not exist in database");
      }
      // push the product ID to the find category collection
      await findCategory.products.push(product);
      await findCategory.save();
      return { ...result._doc, _id: result._doc._id.toString() };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addInventory: async (args) => {
    try {
      const inventory = new Inventory({
        product: args.inventoryInput.product,
        stock: args.inventoryInput.stock
      });
      const result = await inventory.save();

      // find product in the database
      const findProduct = await Product.findById(args.inventoryInput.product);
      // check if it doesn't exists
      if (!findProduct) {
        throw new Error("Product does not exist in database");
      }
      // push the inventory ID to the find product collection
      await findProduct.inventory.push(inventory);
      await findProduct.save();
      // *****************************************************
      return { ...result._doc, _id: result._doc._id.toString() };
    } catch (error) {
      throw error;
    }
  }
};
