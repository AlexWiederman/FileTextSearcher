import { gql } from '@apollo/client';


export const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      firstName
      lastName
      ownedCars {
        _id
        carModel
        make
        year
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    token
    user {
      ownedCars {
        _id
        year
        make
        carModel
      }
    }
  }
}
`;

export const ADD_CAR = gql`
mutation Mutation($make: String!, $carModel: String!, $year: Int!) {
  addCar(make: $make, carModel: $carModel, year: $year) {
    _id
    carModel
    make
    year
  }
}
`;

export const DELETE_USER = gql`
mutation Mutation($id: ID!) {
  deleteUser(_id: $id) {
    _id
    email
    firstName
    lastName
    ownedCars {
      _id
      carModel
      make
      year
    }
  }
}
`

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const REMOVE_CAR = gql`
mutation RemoveCar($id: ID!) {
  removeCar(_id: $id) {
    _id
    email
    firstName
    ownedCars {
      _id
      carModel
      make
      year
    }
    lastName
  }
}
`