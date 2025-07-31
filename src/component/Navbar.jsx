import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  // Filter suggestions on input
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // limit to 5 suggestions
  }, [searchTerm, products]);

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar d-flex flex-column flex-md-row justify-content-between align-items-center px-3 py-2">
          <Link
            to={"/"}
            className="left mb-2 mb-md-0"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E - Commerce</h3>
          </Link>

          <div
            className="position-relative flex-grow-1 w-100"
            style={{ maxWidth: "500px" }}
          >
            <form
              className="d-flex align-items-center mb-2 mb-md-0 bg-dark rounded px-2 py-1"
              onSubmit={submitHandler}
            >
              <span className="material-symbols-outlined text-white me-2">
                search
              </span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search Products..."
                className="form-control bg-dark text-white border-0"
                autoComplete="off"
              />
            </form>
          

            {suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100 mt-1 shadow"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action bg-dark text-white border-secondary"
                    onClick={() => {
                      setSearchTerm(item.title);
                      navigate(`/product/search/${item.title}`);
                      setSuggestions([]);
                    }}
                  >
                    🔍 {item.title}{" "}
                    <span className="text-muted">({item.category})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="right d-flex flex-wrap justify-content-center">
            {isAuthenticated ? (
              <>
                <Link
                  to={"/cart"}
                  className="btn btn-primary position-relative mx-1 my-1"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-1 my-1">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-1 my-1"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-1 my-1">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-1 my-1">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname === "/" && (
          <div className="sub_bar d-flex flex-wrap justify-content-center gap-2 px-3 py-2">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory("phone")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory("laptop")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory("camera")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterbyCategory("headphone")}
            >
              Headphones
            </div>
            <div className="items" onClick={() => filterbyPrice(15999)}>
              15999
            </div>
            <div className="items" onClick={() => filterbyPrice(25999)}>
              25999
            </div>
            <div className="items" onClick={() => filterbyPrice(49999)}>
              49999
            </div>
            <div className="items" onClick={() => filterbyPrice(69999)}>
              69999
            </div>
            <div className="items" onClick={() => filterbyPrice(89999)}>
              89999
            </div>
          </div>
        )}
      </div>
      
    </>
  );
};

export default Navbar;
