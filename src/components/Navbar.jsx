// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducer/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // stop dropdown from closing incorrectly
    dispatch(logout()); // clears Redux state + localStorage
    localStorage.removeItem("user"); // safety
    localStorage.removeItem("token"); // safety
    navigate("/login", { replace: true }); // redirect safely
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#111" }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          🛍️ MyShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {["Home", "Product", "Contact", "Cart"].map((item) => (
              <li className="nav-item mx-2" key={item}>
                <Link
                  className="nav-link fw-bold btn btn-dark btn-lg px-4 py-2 rounded-pill text-light"
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  style={{
                    transition: "all 0.3s",
                    backgroundColor: "#1a1a1a",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#1a1a1a")
                  }
                >
                  {item}
                </Link>
              </li>
            ))}

            {!auth.isLoggedIn ? (
              <li className="nav-item mx-2">
                <Link
                  className="btn btn-warning btn-lg px-4 py-2 rounded-pill fw-bold text-dark"
                  to="/login"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffb347, #ffcc33)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#ffb347")}
                  onMouseLeave={(e) =>
                    (e.target.style.background =
                      "linear-gradient(135deg, #ffb347, #ffcc33)")
                  }
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown ms-lg-3">
                <button
                  className="nav-link dropdown-toggle btn btn-dark btn-lg px-4 py-2 rounded-pill d-flex align-items-center text-light"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#1a1a1a",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#1a1a1a")
                  }
                >
                  👤 {auth.user?.name || "User"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span
                      className="dropdown-item"
                      onClick={() => navigate("/profile")}
                      style={{ cursor: "pointer" }}
                    >
                      Profile
                    </span>
                  </li>
                  <li>
                    <span
                      className="dropdown-item"
                      onClick={() => navigate("/orders")}
                      style={{ cursor: "pointer" }}
                    >
                      My Orders
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
