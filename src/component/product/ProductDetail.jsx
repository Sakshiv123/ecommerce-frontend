
import React, { useState, useEffect ,useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(AppContext);
  const API_URL = "https://ecommerce-backend-2avx.onrender.com/api"; // Adjust this if using production API

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="container text-center my-5 text-danger">
        <h3>{error}</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex align-items-center gy-4">
          <div className="col-12 col-md-6 text-center">
            <img
              src={product.imgSrc}
              alt={product.title}
              className="img-fluid"
              style={{
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "10px",
                border: "2px solid yellow",
              }}
            />
          </div>
          <div className="col-12 col-md-6 text-start">
            <h2 className="fw-bold">{product.title}</h2>
            <p className="text-secondary">{product.description}</p>
            <h3 className="text-success fw-semibold">
              ₹{product.price.toLocaleString("en-IN")}
            </h3>
            <p className="text-secondary">
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>In Stock:</strong> {product.qty}
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              {/* <button className="btn btn-danger fw-bold">Buy Now</button> */}
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

      {/* Related products section */}
      {product.category && (
        <div className="container my-5">
          <h4 className="mb-3 text-center">Related Products</h4>
          <RelatedProduct category={product.category} />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
