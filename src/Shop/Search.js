import React, { useState, useEffect } from "react";
import { getProducts, getCategories } from "../Request/Api";
import Card from "./Card";

function Search() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchProduct, setSearchProduct] = useState({
    search: "",
    category: "",
  });

  const handleChange = (e) => {
    setSearchProduct({ ...searchProduct, [e.target.id]: e.target.value });
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    let { search, category } = searchProduct;

    if (search || category) {
      console.log("category", category);
      getProducts({ search: search || undefined, category }).then((res) => {
        setProduct(res);
        console.log(res);
      });
    } else {
      setProduct([]);
    }
  };

  const searchByCategory = (e) => {
    e.preventDefault();

    let { category } = searchProduct;

    if (category) {
      console.log("category", category);
      getProducts({ category }).then((res) => {
        setProduct(res);
        console.log(res);
      });
    } else {
      setProduct([]);
    }
  };

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);
  return (
    <div className="my-4">
      <form onSubmit={searchSubmit}>
        <div className="row justify-content-between">
          <div className="col-6 col-md-4">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              id="category"
            >
              <option value="">Categories</option>
              {categories &&
                categories.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-6 col-md-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Anime Name"
                aria-label="Enter Your Anime Name"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                id="search"
              />
              <button className="btn btn-secondary" id="basic-addon2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row my-6">
        {product.map((item) => (
          <div key={item._id} className="col-12 col-md-6 col-lg-3">
            <Card product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
