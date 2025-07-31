import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="container py-4">
      <div className="row g-4">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <div className="card bg-dark text-light w-100 h-100 shadow-sm">
                <Link
                  to={`/product/${product._id}`}
                  className="p-3 d-flex justify-content-center align-items-center"
                >
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="card-img-top img-fluid"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "2px solid yellow"
                    }}
                  />
                </Link>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h6 className="card-title text-truncate">{product.title}</h6>
                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">{product.price} ₹</span>
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
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-light">
            <h5>No products found</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
