const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  input AddressInput {
    street: String!
    city: String!
    postalCode: String!
  }
  input ItemInput {
    product: String!
    quantity: Int!
    total: Float!
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
    quantity: Int
    total: Float
  }
  type Order {
    _id: ID
    items: [Item]
    address: Address
    user: User
    name: String
    totalPrice: Float
    paid: Boolean
    isDelivered: Boolean
    paymentMethod: String
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
    getProduct(slug: String!): Product
    loginUser(email: String!, password: String!): UserAuth
    products: [Product!]
    categories: [Category!]
    brands: [Brand!]
    orders(user: String!): [Order!]
    allOrders: [Order!]
    order(id: String!): Order
  }

  type Mutation {
    addCategory(name: String!): Category
    addBrand(name: String!): Brand
    addProduct(
      name: String!
      slug: String!
      image: String!
      imageID: String!
      price: Float!
      stock: Int!
      description: String!
      brand: String!
      category: String!
      feature: Boolean
      featureImage: String
      featureImageID: String
    ): Product
    createAccount(
      email: String!
      firstName: String!
      lastName: String!
      role: String
      password: String!
    ): User
    createOrder(
      address: AddressInput!
      item: [ItemInput!]!
      name: String!
      paid: Boolean
      paymentMethod: String!
      totalPrice: Float!
      user: String!
    ): Order
    updateOrder(
      id: String
      paid: Boolean
      delivered: Boolean
    ): Order
  }
`;
