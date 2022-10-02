const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  input AddressInput {
    street: String!
    city: String!
    postalCode: String!
  }
  input CreateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    role: String
    password: String!
  }
  input GetProductInput {
    slug: String!
  }
  input InventoryInput {
    product: String!
    stock: Int!
  }
  input ItemInput {
    product: String!
    count: Int!
    total: Float!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input OrderInput {
    user: String!
    items: [ItemInput!]!
    address: AddressInput!
  }
  input ProductInput {
    slug: String!
    iamgeID: String!
    image: String!
    name: String!
    price: Float!
    category: String
    description: String!
  }
  input ProductInventoryInput {
    _id: String!
  }

  type Address {
    street: String
    city: String
    postalCode: String
  }
  type Brand {
    _id: ID
    name: String
    products: [Product!]
  }
  type Category {
    _id: ID
    name: String
    products: [Product!]
  }
  type Item {
    product: Product
    count: Int
    total: Float
  }
  type Order {
    items: [Item]
    address: Address
    user: User
  }
  type Product {
    _id: ID
    imageID: String
    image: String
    name: String
    slug: String
    price: Float
    stock: Int
    rating: Float
    brand: Brand
    category: Category
    description: String
  }
  type User {
    _id: ID
    password: String
    email: String
    firstName: String
    lastName: String
    emailToken: String
    verified: Boolean
  }
  type UserAuth {
    _id: ID!
    email: String!
    role: String!
    token: String!
    tokenExpiration: Int
  }

  type Query {
    getProduct(getProductInput: GetProductInput): Product
    loginUser(email: String!, password: String!): UserAuth
    products: [Product!]
    categories: [Category!]
    brands: [Brand!]
  }

  type Mutation {
    addCategory(name: String!): Category
    addBrand(name: String!): Brand
    addProduct(
      name: String!,
      slug: String!,
      image: String!,
      imageID: String!,
      price: Float!,
      stock: Int!,
      description: String!,
      brand: String!,
      category: String!,
      feature: Boolean,
      featureImage: String,
      featureImageID: String
      ): Product
    createAccount(userInput: CreateUserInput): User
    createOrder(
      user: String!
    ): Order
  }
`;
