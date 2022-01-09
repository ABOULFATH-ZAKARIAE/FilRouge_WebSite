import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { getCategories } from "../../Request/Api";
import { isAuthenticated } from "../../Auth/Helper";
import { API_URL } from "../../Config";
import toastr from "toastr";
import "toastr/build/toastr.css";

function Category() {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  useEffect(() => {
    getCategories().then((categories) => setCategory(categories));
  }, []);
  // =============== UPDATE ALL CATEGORY =================
  const handleChangeUpdate = (e) => {
    setName(e.target.value);
  };

  const updateCategory = (e) => {
    e.preventDefault();

    const { user, token } = isAuthenticated();

    fetch(`${API_URL}/category/update/${categoryId._id}/${user._id}`, {
      method: "PUT",
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
          toastr.warning(res.error, "Please Check your form !!", {
            positionClass: "toast-bottom-left",
          });
        } else {
          toastr.success(
            `Category ${name} is Updated`,
            "Update is Successfully",
            {
              positionClass: "toast-bottom-left",
            }
          );
          window.location.reload();

          setName("");
        }
      });
  };
  // =============== DELETE ALL CATEGORY =================
  const deleteCategory = (id) => {
    const { user, token } = isAuthenticated();

    fetch(`${API_URL}/category/delete/${id}/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toastr.success(
          "This category is deleted successfully",
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
      <div className="row mb-3 ">
        <div className="col-6">
          <h4>Add Category</h4>
        </div>
        <div className="col-6 d-flex flex-row" style={{ marginLeft: "3px" }}>
          <Link className="btn btn-primary" to="/Addcategory">
            Create Cateory
          </Link>
        </div>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col-5">ID</th>
            <th scope="col-5" rowSpan="2">
              Name
            </th>
            <th scope="col-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item) => (
            <tr key={item._id}>
              <td scope="col">{item._id}</td>
              <td scope="col">{item.name}</td>
              <td scope="col">
                <div className="row">
                  <div className="col-2">
                    <button
                      onClick={() => setCategoryId(item)}
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
                              Update Category
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={updateCategory}>
                              <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                  Category
                                </label>
                                <input
                                  onChange={handleChangeUpdate}
                                  defaultValue={categoryId.name}
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
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
                              onClick={() => deleteCategory(deleteId?._id)}
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

export default Category;
