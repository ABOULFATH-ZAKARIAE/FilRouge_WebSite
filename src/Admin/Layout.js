import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="container-fluid  px-0 overflow-hidden">
      <div className="row" style={{ minHeight: "92.2vh" }}>
        <div className="col-2">
          <div
            className="d-flex flex-column bg-dark"
            style={{ minHeight: "100%" }}
          >
            <Link
              to="/product"
              className="d-flex flex-row px-3 py-2 mb-4 mt-3 mx-4 bg-primary rounded"
            >
              <i
                className="bi bi-house"
                style={{ color: "white", fontSize: "13px" }}
              ></i>
              <p style={{ color: "white" }} className="mx-2 mb-0 fw-bold">
                Product
              </p>
            </Link>
            <Link
              to="/category"
              className="d-flex flex-row px-3 py-2 mb-4 mx-4 bg-primary rounded"
            >
              <i
                className="bi bi-house"
                style={{ color: "white", fontSize: "13px" }}
              ></i>
              <p style={{ color: "white" }} className="mx-2 mb-0 fw-bold">
                Category
              </p>
            </Link>
            <Link
              to="/order"
              className="d-flex flex-row px-3 py-2 mb-4 mx-4 bg-primary rounded"
            >
              <i
                className="bi bi-house"
                style={{ color: "white", fontSize: "13px" }}
              ></i>
              <p style={{ color: "white" }} className="mx-2 mb-0 fw-bold">
                Order
              </p>
            </Link>
          </div>
        </div>
        <div className="col-10 py-5">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
