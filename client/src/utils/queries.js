import { gql } from "@apollo/client";

export const QUERY_OIL = gql`
  query Oil($id: [ID]!) {
    oil(_id: $id) {
      _id
      name
      image
      price
      quantity
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query Query {
    allProducts {
      _id
      name
      image
      price
      quantity
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query Checkout($cart: String) {
    checkout(cart: $cart) {
      session
    }
  }
`;

export const QUERY_GARAGE = gql`
  query Garage {
    garage {
      _id
      email
      firstName
      lastName
      ownedCars {
        _id
        carModel
        make
        year
        carId
        image
        drive
        fuel_type
      }
    }
  }
`;
