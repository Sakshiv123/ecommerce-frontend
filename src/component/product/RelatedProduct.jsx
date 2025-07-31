import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products,addToCart} = useContext(AppContext);
  const [realtedProduct, setRealtedProduct] = useState([]);

  useEffect(() => {
    setRealtedProduct(
      products.filter(
        (data) =>
          data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="container text-center">
      <h2 className="my-4">Related Products</h2>
      <div className="row g-4 justify-content-center">
        {realtedProduct?.map((product) => (
          <div
            key={product._id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          >
            <div className="card bg-dark text-light h-100 w-100">
              <Link
                to={`/product/${product._id}`}
                className="p-3 d-flex justify-content-center align-items-center"
              >
                <img
                  src={product.imgSrc}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </Link>
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{product.title}</h5>
                <div className="mt-3">
                  <button className="btn btn-primary mx-2">
                    ₹{product.price}
                  </button>
                  <button 
                   className="btn btn-sm btn-warning"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
                  >
                    Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
