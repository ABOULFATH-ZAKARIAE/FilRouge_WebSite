import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incProductCount,
  decProductCount,
  removeProduct,
} from "../Actions/CartAction";
import ShowImage from "./ShowImage";
import CheckOut from "./CheckOut";

function ShopingCart() {
  let productsInCart = useSelector((state) => state.cart.products);
  let dispatch = useDispatch();
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th
                  className="fs-6 fw-bold"
                  style={{ color: "gray" }}
                  scope="col"
                >
                  Image
                </th>
                <th
                  className="fs-6 fw-bold"
                  style={{ color: "gray" }}
                  scope="col"
                >
                  Product
                </th>
                <th
                  className="fs-6 fw-bold"
                  style={{ color: "gray" }}
                  scope="col"
                >
                  Quantity
                </th>
                <th
                  className="fs-6 fw-bold"
                  style={{ color: "gray" }}
                  scope="col"
                >
                  Price
                </th>
                <th
                  className="fs-6 fw-bold"
                  style={{ color: "gray" }}
                  scope="col"
                >
                  Total
                </th>
                <th
                  className="fs-6 fw-bold"
                  style={{ color: "gray" }}
                  scope="col"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {productsInCart.map((product) => (
                <tr key={product._id}>
                  <td>
                    <ShowImage
                      item={product}
                      url="product/photo"
                      className="img-fluid rounded-start"
                      width="70px"
                      height="50px"
                    ></ShowImage>
                  </td>
                  <td>
                    <h5 style={{ fontWeight: "700" }}>{product.name}</h5>
                    <p>{product.description}</p>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-around border border-secondary ">
                      <button
                        onClick={() => dispatch(incProductCount(product))}
                        className="btn btn-primary fs-5 fw-bold"
                        style={{
                          backgroundColor: "white",
                          border: "none",
                          color: "black",
                        }}
                      >
                        +
                      </button>
                      <p className="mb-0">{product.count}</p>
                      {product.count > 1 && (
                        <button
                          onClick={() => dispatch(decProductCount(product))}
                          className="btn btn-primary fs-5 fw-bold"
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            color: "black",
                          }}
                        >
                          -
                        </button>
                      )}
                    </div>
                  </td>
                  <td>{product.price} $</td>
                  <td>
                    {(product.price * product.count).toString().substr(0, 5)}
                  </td>
                  <td>
                    <button
                      onClick={() => dispatch(removeProduct(product._id))}
                      className="btn btn-sm btn-danger btn-raised"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <div className="col-12 col-md-12 col-lg-5">
          <CheckOut products={productsInCart} />
        </div>
      </div>
    </div>
  );
}

export default ShopingCart;
