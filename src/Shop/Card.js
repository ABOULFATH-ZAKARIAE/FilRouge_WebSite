import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addToCart } from "../Actions/CartAction";
import { useDispatch } from "react-redux";

function Card({ product }) {
  let dispatch = useDispatch();
  return (
    <div>
      <div className="card my-2 border border-2">
        <ShowImage
          item={product}
          url="product/photo"
          className="card-img-top"
          height="300px"
        />
        <div className="card-body">
          <small className="text-muted">
            {moment(product.createdAt).fromNow()}
          </small>
          <h5 className="card-title">{product.name}</h5>
          <div className="card-text">
            <div className="row align-items-center">
              <div className="col-6">
                <span className="badge bg-secondary">{product.category.name}</span>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div
                  className="position-relative border border-secondary rounded-circle d-flex align-items-center py-2 px-2"
                  style={{ marginRight: "6px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bag"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0       0 1-1-1V5z" />
                  </svg>
                  <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-success">
                    {product.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-between align-items-center mt-2">
            <div className="col-4">
              <p className="mb-0">Price</p>
              <h5>{product.price} $</h5>
            </div>
            <div className="col-8 d-flex justify-content-between align-items-center">
              <Link
                to={`/detailsproduct/${product._id}`}
                className="card-title mx-2 d-flex align-items-center justify-content-center mb-0 rounded-circle"
                style={{
                  backgroundColor: "gray",
                  width: "45px",
                  height: "45px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-arrows-fullscreen"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                  />
                </svg>
              </Link>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="p-3 d-flex rounded-circle"
                style={{
                  backgroundColor: "gray",
                  borderColor: "gray",
                  borderWidth: 0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
