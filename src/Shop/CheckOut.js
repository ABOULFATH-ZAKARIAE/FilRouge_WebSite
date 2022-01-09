import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { isAuthenticated, emptyCart } from "../Auth/Helper";
import { processPayment, createOrder, getBrainTreeToken } from "../Request/Api";
import toastr from "toastr";
import "toastr/build/toastr.css";

const CheckOut = ({ products }) => {
  const [data, setData] = useState({
    braintreeToken: null,
    error: null,
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getBrainTreeToken(userId, token)
      .then((res) => setData({ ...data, braintreeToken: res.token }))
      .catch((err) => setData({ ...data, error: err }));
  }, []);

  const totalToCheckout = (products) => {
    return products.reduce(
      (total, product) => total + product.count * product.price,
      0
    );
  };

  const dropIn = () => {
    return (
      <div>
        {data.braintreeToken !== null && products.length > 0 && (
          <DropIn
            options={{
              authorization: data.braintreeToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
        )}
      </div>
    );
  };

  const buy = () => {
    const delivryAddress = data.address;

    data.instance
      .requestPaymentMethod()
      .then((data) => {
        let paymentData = {
          amount: totalToCheckout(products),
          paymentMethodNonce: data.nonce,
        };
        console.log("payment data", paymentData);
        processPayment(userId, token, paymentData)
          .then((res) => {
            console.log("response", res);

            let orderData = {
              products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
              address: delivryAddress,
            };
            createOrder(userId, token, orderData)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));

            emptyCart(() => {
              toastr.success(
                "Valid",
                "Thank you for Payment was Successfully",
                {
                  positionClass: "toast-bottom-left",
                }
              );
            });
          })
          .catch((err) => {
            toastr.error("inValid", err.message, {
              positionClass: "toast-bottom-left",
            });
          });
      })
      .catch((err) => {
        toastr.error("inValid", err.message, {
          positionClass: "toast-bottom-left",
        });
      });
  };

  const showBtnToCheckout = () => {
    if (isAuthenticated()) {
      return (
        <div>
          {dropIn()}
          <div className="d-grid">
            <button
              onClick={buy}
              className="btn btn-raised btn-success btn-block"
            >
              Buy
            </button>
          </div>
        </div>
      );
    }
    return (
      <Link to="/register">
        <button className="btn btn-raised btn-warning btn-block my-2">
          Sign to Checkout
        </button>
      </Link>
    );
  };

  const handleInput = (e) => {
    setData({ ...data, address: e.target.value });
  };
  return (
    <div>
      <h2>
        Total :{" "}
        <span className="badge bg-secondary">
          {totalToCheckout(products).toString().substring(0, 7)} $
        </span>{" "}
      </h2>
      <label htmlFor="address">Delivered Address</label>
      <textarea
        className="form-control"
        onChange={handleInput}
        rows="2"
      ></textarea>
      {showBtnToCheckout()}
    </div>
  );
};

export default CheckOut;
