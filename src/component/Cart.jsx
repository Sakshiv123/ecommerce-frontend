
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      {cart?.items?.length === 0 ? (
        <div className="text-center my-5">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            onClick={() => navigate("/")}
          >
            Continue Shopping...
          </button>
        </div>
      ) : (
        <div className="text-center my-4">
          <button className="btn btn-info mx-3 fw-bold fs-5">
            Total Qty: {qty}
          </button>
          <button className="btn btn-warning mx-3 fw-bold fs-5">
            Total Price: ₹{price}
          </button>
        </div>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product.id}
          className="container bg-dark text-light my-4 p-3 rounded"
        >
          <div className="row align-items-center">
            <div className="col-12 col-md-3 text-center mb-2 mb-md-0">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="img-fluid rounded"
                style={{ maxHeight: "120px" }}
              />
            </div>
            <div className="col-12 col-md-4 text-center text-md-start">
              <h5 className="mb-1">{product.title}</h5>
              <p className="mb-1">₹{product.price}</p>
              <p className="mb-1">Qty: {product.qty}</p>
            </div>
            <div className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end flex-wrap gap-2 mt-2 mt-md-0">
              <button
                className="btn btn-secondary"
                onClick={() => decreaseQty(product.productId, 1)}
              >
                Qty--
              </button>
              <button
                className="btn btn-info"
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                Qty++
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm("Are you sure you want to remove this item?")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-4">
          <button
            className="btn btn-success mx-3 fw-bold"
            onClick={() => navigate("/shipping")}
          >
            Proceed to Checkout
          </button>
          <button
            className="btn btn-danger mx-3 fw-bold"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear the cart?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
