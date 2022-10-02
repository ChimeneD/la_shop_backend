const { Brand } = require("../../models/brand.model");
const { Category } = require("../../models/category.model");
const { Product } = require("../../models/product.model");
const { getCategory, getBrand } = require("./merged");

exports.productQuery = {
  // Queries
  products: async () => {
    try {
      const data = await Product.find({});
      const result = data.map((product) => {
        return {
          ...product._doc,
          _id: product.id,
          brand: getBrand.bind(this, product.brand), // use the get category function
          category: getCategory.bind(this, product.category),
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
        slug: args.getProductInput.slug,
      });
      const result = {
        ...product._doc,
        _id: product.id,
        brand: getBrand.bind(this, product.brand), // use the get category function
        category: getCategory.bind(this, product.category),
      };

      return result;
    } catch (err) {
      throw err;
    }
  },
};
exports.productMutation = {
  // Mutations
  addProduct: async (parent, args) => {
    try {
      const product = new Product({
        slug: args.slug,
        image: args.image,
        imageID: args.imageID,
        name: args.name,
        price: args.price,
        stock: args.stock,
        category: args.category,
        brand: args.brand,
        description: args.description,
        feature: args.feature,
        featureImage: args.featureImage,
        featureImageID: args.featureImageID
      });
      const result = await product.save();
      // find category in the database
      const findCategory = await Category.findById(args.category);
      // check if it doesn't exists
      if (!findCategory) {
        throw new Error("Category does not exist in database");
      }
      // push the product ID to the find category collection
      await findCategory.products.push(product);
      await findCategory.save();
      // find brand in the database
      const findBrand = await Brand.findById(args.brand);
      // check if it doesn't exists
      if (!findBrand) {
        throw new Error("Brand does not exist in database");
      }
      // push the product ID to the find category collection
      await findBrand.products.push(product);
      await findBrand.save();
      return { ...result._doc, _id: result._doc._id.toString() };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
