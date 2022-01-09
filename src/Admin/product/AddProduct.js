import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { isAuthenticated } from "../../Auth/Helper";
import { API_URL } from "../../Config";
import toastr from "toastr";
import "toastr/build/toastr.css";

function AddProduct(props) {
  const { user, token } = isAuthenticated();

  const [product, setProduct] = useState({
    photo: "",
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: 0,
    shipping: false,
  });

  const [formData, setFormData] = useState(new FormData());

  const [categories, setCategories] = useState([]);

  useEffect(() => getCategories(), []);

  const getCategories = () => {
    fetch(`${API_URL}/category`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.categories))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const value = e.target.id === "photo" ? e.target.files[0] : e.target.value;

    formData.set(e.target.id, value);

    setProduct({ ...product, [e.target.id]: value });
  };

  const submitProduct = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/product/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, "Please Check form !", {
            positionClass: "toast-bottom-left",
          });
        } else {
          toastr.success(`Product ${product.name} created`, "new Product", {
            positionClass: "toast-bottom-left",
          });

          setProduct({
            photo: "",
            name: "",
            description: "",
            quantity: 0,
            price: 0,
            shipping: false,
            category: 0,
          });
          setFormData(new FormData());
          props.history.push("/product");
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
      <div className="col-6 mx-auto pb-5">
        <form onSubmit={submitProduct}>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">
              Product Image
            </label>
            <input
              onChange={handleChange}
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="name"
              name="name"
            />
          </div>
          <div className="form-floating mb-3">
            <textarea
              onChange={handleChange}
              className="form-control"
              placeholder="Leave a comment here"
              id="description"
              htmlFor="description"
              name="description"
              style={{ height: "100px" }}
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>
          <div className="mb-5">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              id="price"
              name="price"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="category">Category</label>
            <select
              value={product.category}
              onChange={handleChange}
              name="category"
              id="category"
              className="form-control"
            >
              <option value="0">Select a category</option>
              {categories &&
                categories.map((category, i) => (
                  <option key={i} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="shipping">shipping</label>
            <select
              value={product.shipping}
              onChange={handleChange}
              name="shipping"
              id="shipping"
              className="form-control"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AddProduct;
