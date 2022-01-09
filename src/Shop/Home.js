import React, { useState, useEffect } from "react";
import { getProducts } from "../Request/Api";
import Search from "../Shop/Search";
import Card from "./Card";

function Home() {
  const [products, setProducts] = useState([]);
  const [items, setItem] = useState([]);

  const getProductBestSellers = () => {
    getProducts({ sortBy: "sold", order: "desc", limit: 30 }).then((products) =>
      setItem(products)
    );
  };

  const getProductArrivals = () => {
    getProducts({ sortBy: "createdAt", order: "desc", limit: 3 }).then(
      (products) => setProducts(products)
    );
  };

  useEffect(() => {
    getProductBestSellers();
    getProductArrivals();
  }, []);
  return (
    <div className="container pb-5">
      <Search />
      <hr />
      <h1> New Arrival Products</h1>
      <div className="row my-8">
        {products.map((item) => (
          <div key={item._id} className="col-12 col-md-6 col-lg-3">
            <Card product={item} />
          </div>
        ))}
      </div>
      <hr />
      <h1> Best Sales Products</h1>
      <div className="row my-6 pb-5">
        {items.map((item) => (
          <div key={item._id} className="col-12 col-md-6 col-lg-3">
            <Card product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
