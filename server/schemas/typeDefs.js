const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    ownedCars: [Car]
    orders: [Order]
  }

  type Car {
    _id: ID!
    make: String!
    carModel: String!
    year: Int!
    carId: String!
    image: String
    drive: String!
    fuel_type: String
  }

  type Product {
    _id: ID!
    image: String!
    name: String!
    price: Int!
    quantity: Int!
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Checkout {
    session: String
  }
  
  type Query {
    garage: User
    allProducts: [Product]
    oil(_id: [ID]!): Product
    order(_id: ID!): Order
    checkout(cart: String): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    deleteUser(_id: ID!): User
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    addCar(make: String!, carModel: String!, year: Int!): Car
    removeCar(_id: ID!): Car
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
