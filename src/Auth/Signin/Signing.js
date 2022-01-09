import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Config";
import toastr from "toastr";
import "toastr/build/toastr.css";

function Signing(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitSignin = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/singnin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, "Please Check form !", {
            positionClass: "toast-bottom-left",
          });
        } else {
          toastr.info(
            "Adminstrateur  is authenticated SuccessFully",
            "Welcome",
            {
              positionClass: "toast-bottom-left",
            }
          );

          localStorage.setItem("jwt_info", JSON.stringify(res));
          if(res.user.role === "ADMIN"){
            props.history.push('/product')
          }else if(res.user.role === "USER"){
              props.history.push('/')
          }
          setTimeout(() => window.location.reload(), 1000);
        }
      })
      .catch((err) =>
        toastr.error(err, "Server error !", {
          positionClass: "toast-bottom-left",
        })
      );
  };
  const form = () => (
    <form onSubmit={submitSignin} className="my-4">
      <div className="form-group my-3">
        <label htmlFor="email" className="text-muted  fw-bold">
          Email :{" "}
        </label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control "
          id="email"
        />
      </div>

      <div className="form-group">
        <div className="form-group mb-4">
          <label htmlFor="password" className="text-muted  fw-bold">
            Password :
          </label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control "
            id="password"
          />
        </div>
        <div className="d-flex justify-content-between align-items-top mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="remember"
            />
            <label className="form-check-label mb-0" for="remember">
              Remember me
            </label>
          </div>
          <div>
            <a href="" className="small text-right text-decoration">
              Lost password?
            </a>
          </div>
        </div>
      </div>

      <div className="d-grid my-2">
        <button type="submit" className="btn btn-primary fw-bolder">
          Log In
        </button>
      </div>
    </form>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto">{form()}</div>
      </div>
    </div>
  );
}

export default Signing;
