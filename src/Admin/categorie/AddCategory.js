import React, { useState } from "react";
import { isAuthenticated } from "../../Auth/Helper";
import { API_URL } from "../../Config";
import toastr from "toastr";
import Layout from "../Layout";
import "toastr/build/toastr.css";

function AddCategory(props) {
  const [name, setName] = useState("");
  // =============== CREATE ALL CATEGORY =================
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const submitCategory = (e) => {
    e.preventDefault();

    const { user, token } = isAuthenticated();

    fetch(`${API_URL}/category/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, "Please Check form !", {
            positionClass: "toast-bottom-left",
          });
        } else {
          toastr.success(`Category ${name} created`, "new Category", {
            positionClass: "toast-bottom-left",
          });
          props.history.push("/category");
          setName("");
        }
      })
      .catch((err) =>
        toastr.error(err, "Server error !", {
          positionClass: "toast-bottom-left",
        })
      );
  };
  return (
    <Layout>
      <div className="col-6 mx-auto">
        <form onSubmit={submitCategory}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Category
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AddCategory;
