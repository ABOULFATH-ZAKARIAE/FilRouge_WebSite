import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import ShowImage from "../../Shop/ShowImage";
import { getProducts } from "../../Request/Api";
import { isAuthenticated } from "../../Auth/Helper";
import { API_URL } from "../../Config";
import toastr from "toastr";
import "toastr/build/toastr.css";

function Product() {
  const [products, setProducts] = useState([]);

  const [productId, setProductId] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [productUpdate, setProductUpdate] = useState("");

  const [formData, setFormData] = useState(new FormData());

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  // ******************** Method Update Product *******************

  const handleChange = (e) => {
    const value = e.target.id === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.id, value);

    setProductUpdate({ ...productUpdate, [e.target.id]: value });
  };

  const updateProduct = async (e) => {
    const { user, token } = isAuthenticated();
    e.preventDefault();
    fetch(`${API_URL}/product/update/${productId._id}/${user._id}`, {
      method: "PUT",
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
        }

        toastr.success("Product is Updated", "Update is Done", {
          positionClass: "toast-bottom-left",
        });

        console.log(res.product);
        setProductUpdate(res.product);

        setFormData(new FormData());
        //    setActive(true)
        window.location.reload();
      })
      .catch((err) =>
        toastr.error(err, "Server error !", {
          positionClass: "toast-bottom-left",
        })
      );
  };

  const deleteProduct = (id) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/product/delete/${id}/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        toastr.success(
          "This Product is deleted successfully",
          "Delete is successful",
          {
            positionClass: "toast-bottom-left",
          }
        );
        window.location.reload();
      })
      .catch((err) =>
        toastr.error(err, "Server error !", {
          positionClass: "toast-bottom-left",
        })
      );
  };
  return (
    <Layout>
      <div className="row mb-3">
        <div className="col-6">
          <h4>Add Product</h4>
        </div>
        <div className="col-6 d-flex flex-row" style={{ marginLeft: "3px" }}>
          <Link className="btn btn-primary" to="/Addproduct">
            Create Product
          </Link>
        </div>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">PRODUCT</th>
            <th scope="col">NAME</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">PRICE</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">SOLD</th>
            <th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td scope="col">
                <ShowImage
                  item={item}
                  url="product/photo"
                  classDiv="col-12 mx-auto"
                  height="100px"
                  width="100%"
                ></ShowImage>
              </td>
              <td scope="col">{item.name}</td>
              <td scope="col">{item.description}</td>
              <td scope="col">{item.category.name}</td>
              <td scope="col">{item.price} $</td>
              <td scope="col">{item.quantity}</td>
              <td scope="col">{item.sold}</td>
              <td scope="col">
                <div className="row">
                  <div className="col-12 my-1">
                    <button
                      onClick={() => setProductId(item)}
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#createCategory"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <div
                      className="modal fade"
                      id="createCategory"
                      tabIndex="-1"
                      aria-labelledby="createCategory"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="createCategory">
                              Update Product
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={updateProduct}>
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
                              <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                  Product Name
                                </label>
                                <input
                                  onChange={handleChange}
                                  defaultValue={productId.name}
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                  Description
                                </label>
                                <input
                                  onChange={handleChange}
                                  defaultValue={productId.description}
                                  type="text"
                                  className="form-control"
                                  id="description"
                                  name="description"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                  Price
                                </label>
                                <input
                                  onChange={handleChange}
                                  defaultValue={productId.price}
                                  type="text"
                                  className="form-control"
                                  id="price"
                                  name="price"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">
                                  Quantity
                                </label>
                                <input
                                  onChange={handleChange}
                                  defaultValue={productId.quantity}
                                  type="text"
                                  className="form-control"
                                  id="quantity"
                                  name="quantity"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 my-1">
                    <button
                      onClick={() => setDeleteId(item)}
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
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

                    <div
                      className="modal fade"
                      id="delete"
                      tabIndex="-1"
                      aria-labelledby="delete"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            Are You Sure you want to delete this ?
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                            >
                              CANCEL
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteProduct(deleteId?._id)}
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Product;
