import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="p-4 border border-warning rounded bg-dark text-light shadow">
            <h2 className="text-center mb-4">User Register</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={onChangerHandler}
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={onChangerHandler}
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={onChangerHandler}
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-warning fw-semibold">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
