import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";



function ProductList() {
  //Adding oil from products model

  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // console.log(state)
    console.log(data);
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.allProducts,
      });
      data.allProducts.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((allProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: allProducts,
        });
      });
    }
  }, [data, loading, dispatch]);


  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter((product) => product._id === currentCategory);
  }


  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length > 0 ? (
        <div className="flex-row">
          {/*  {filterProducts().map((product) => ( */}
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
    </div>
  );
}

export default ProductList;
