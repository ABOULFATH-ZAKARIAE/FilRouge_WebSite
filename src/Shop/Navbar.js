import React, { Fragment } from "react";
import { isAuthenticated } from "../Auth/Helper";
import { API_URL } from "../Config";
import { Link } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useSelector } from "react-redux";
import Image from "../layout/favicon.png";

function Navbar(props) {
  let countItem = useSelector((state) => state.cart.count);
  const signout = () => {
    fetch(`${API_URL}/singnout`)
      .then(() => {
        toastr.info("User SignOut", "Next Time", {
          positionClass: "toast-bottom-left",
        });

        localStorage.removeItem("jwt_info");
        window.location.reload();
        props.history.push("/login");
      })
      .catch();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img width="45px" height="39px" src={Image} alt="imge" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {isAuthenticated() && isAuthenticated().user.role === "ADMIN" && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/category">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
            <button className="btn">
              <Link className="text-decoration-none" to="/shoppingCart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="white"
                  className="bi bi-cart-check-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" />
                </svg>
                <span style={{ color: "white" }}> {countItem}</span>
              </Link>
            </button>
            <form className="d-flex">
              {!isAuthenticated() && (
                <Fragment>
                  <Link
                    to="/register"
                    className="btn btn-primary mx-1"
                    style={{ background: "#7B68EE", borderColor: "#7B68EE" }}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-primary mx-1"
                    style={{ background: "#7B68EE", borderColor: "#7B68EE" }}
                  >
                    SignIn
                  </Link>
                </Fragment>
              )}
              {isAuthenticated() && (
                <Fragment>
                  <button
                    onClick={signout}
                    type="button"
                    className="btn btn-primary mx-1"
                    style={{ background: "#0d6efd", borderColor: "#7B68EE" }}
                  >
                    Logout
                  </button>
                </Fragment>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
