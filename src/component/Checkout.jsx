import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import TableProduct from "./TableProduct";

const Checkout = () => {
  const { cart, userAddress } = useContext(AppContext);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Order Summary</h2>

      <div className="row g-4">
        {/* Product Details */}
        <div className="col-12 col-lg-6">
          <div className="card bg-dark text-light h-100">
            <div className="card-header text-center fw-bold fs-5 border-primary">
              Product Details
            </div>
            <div className="card-body">
              <TableProduct cart={cart} />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="col-12 col-lg-6">
          <div className="card bg-dark text-light h-100">
            <div className="card-header text-center fw-bold fs-5 border-primary">
              Shipping Address
            </div>
            <div className="card-body">
              <ul className="list-unstyled fw-bold">
                <li>Name: {userAddress?.fullName}</li>
                <li>Phone: {userAddress?.phoneNumber}</li>
                <li>Country: {userAddress?.country}</li>
                <li>State: {userAddress?.state}</li>
                <li>PinCode: {userAddress?.pincode}</li>
                <li>Near By: {userAddress?.address}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Future: Proceed to Pay Button */}
      {/* 
      <div className="text-center mt-5">
        <button
          className="btn btn-secondary btn-lg fw-bold"
          onClick={handlePayment}
        >
          Proceed To Pay
        </button>
      </div>
      */}
    </div>
  );
};

export default Checkout;
