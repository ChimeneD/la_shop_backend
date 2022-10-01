const { Brand } = require("../../models/brand.model");
const { Category } = require("../../models/category.model");
const { getProducts } = require("./merged");

exports.categoryQuery = {
  // Queries
  categories: async () => {
    try {
      const data = await Category.find({});
      const result = data.map((category) => {
        return {
          ...category._doc,
          _id: category.id,
          products: getProducts.bind(this, category.products), // use the get category function
        };
      });

      return result;
    } catch (err) {
      throw err;
    }
  },
  brands: async () => {
     try {
       const data = await Brand.find({});
       const result = data.map((brand) => {
         return {
           ...brand._doc,
           _id: brand.id,
           products: getProducts.bind(this, brand.products), // use the get category function
         };
       });

       return result;
     } catch (err) {
       throw err;
     }
  },
  // Mutations
};

exports.categoryMutation = {
  addBrand: async (parant, args) => {
    try {
      const brand = new Brand({
        name: args.name,
      });
      const result = await brand.save();
      return { ...result._doc, _id: result._doc._id.toString() };
    } catch (error) {
      throw error
    }
  },
  addCategory: async (parent, args) => {
      try {
        const category = new Category({
          name: args.name,
        });
        const result = await category.save();
        return { ...result._doc, _id: result._doc._id.toString() };
      } catch (error) {
        throw error;
      }
  }
}
