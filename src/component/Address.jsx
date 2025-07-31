import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
     pincode: "",
    phoneNumber: "",
  });
  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("Your form has been submited")

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address adedd ",result)

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });

    // console.log(formData);
  };
  return (
    <>
      <div className="container my-3 p-4">
  <h1 className="text-center">Shipping Address</h1>
  <form onSubmit={submitHandler} className="my-3">
    
    {/* First row: Full Name, Country, State */}
    <div className="row gy-3">
      <div className="col-12 col-md-4">
        <label className="form-label">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={onChangerHandler}
          type="text"
          className="form-control bg-dark text-light"
        />
      </div>
      <div className="col-12 col-md-4">
        <label className="form-label">Country</label>
        <input
          name="country"
          value={formData.country}
          onChange={onChangerHandler}
          type="text"
          className="form-control bg-dark text-light"
        />
      </div>
      <div className="col-12 col-md-4">
        <label className="form-label">State</label>
        <input
          name="state"
          value={formData.state}
          onChange={onChangerHandler}
          type="text"
          className="form-control bg-dark text-light"
        />
      </div>
    </div>

    {/* Second row: City, Pincode, Phone */}
    <div className="row gy-3 mt-2">
      <div className="col-12 col-md-4">
        <label className="form-label">City</label>
        <input
          name="city"
          value={formData.city}
          onChange={onChangerHandler}
          type="text"
          className="form-control bg-dark text-light"
        />
      </div>
      <div className="col-12 col-md-4">
        <label className="form-label">Pincode</label>
        <input
          name="pincode"
          value={formData.pincode}
          onChange={onChangerHandler}
          type="number"
          className="form-control bg-dark text-light"
        />
      </div>
      <div className="col-12 col-md-4">
        <label className="form-label">Phone Number</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChangerHandler}
          type="number"
          className="form-control bg-dark text-light"
        />
      </div>
    </div>

    {/* Address Textarea */}
    <div className="row mt-3">
      <div className="col-12">
        <label className="form-label">Address / Nearby</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={onChangerHandler}
          className="form-control bg-dark text-light"
          rows="3"
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="d-grid col-12 col-md-6 mx-auto mt-4">
      <button
        type="submit"
        className="btn btn-primary"
        style={{ fontWeight: "bold" }}
      >
        Submit
      </button>
    </div>
  </form>

  {/* Old Address Button */}
  {userAddress && (
    <div className="d-grid col-12 col-md-6 mx-auto my-3">
      <button
        className="btn btn-warning"
        onClick={() => navigate("/checkout")}
        style={{ fontWeight: "bold" }}
      >
        Use Old Address
      </button>
    </div>
  )}
</div>

    </>
  );
};

export default Address;
