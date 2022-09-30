const { buildSchema } = require("graphql");

exports.schema = buildSchema(`
      input AddressInput {
        street: String!
        city: String!
        postalCode: String!
      }
      input CategoryInput {
        name: String!
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
      type Category {
        _id: ID
        name: String
        products: [Product!]
      } 
      type Inventory {
        _id: ID
        product: Product
        stock: Int
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
        rating: Float
        category: Category
        description: String
        inventory: [Inventory!]
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
        token: String!
        tokenExpiration: Int
      }

      type Query {
        getProduct(getProductInput: GetProductInput): Product
        inventories: [Inventory!]
        loginUser(loginInput: LoginInput): UserAuth
        products: [Product!]
        categories: [Category!]
        productInventories(productInventoryInput:ProductInventoryInput): [Inventory!]
      }

      type Mutation {
        addCategory(
          categoryInput: CategoryInput
        ): Category
        addInventory(
          inventoryInput: InventoryInput
        ): Inventory
        addProduct(
          productInput: ProductInput
        ): Product
        createAccount(
          userInput: CreateUserInput
        ): User
        createOrder(
          orderInput: OrderInput
        ): Order
      }

      schema {
        query: Query
        mutation: Mutation
      }
`);
