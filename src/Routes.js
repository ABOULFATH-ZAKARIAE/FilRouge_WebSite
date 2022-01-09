import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Shop/Home";
import Navbar from "./Shop/Navbar";
import Signup from "./Auth/Signup/Signup";
import Signing from "./Auth/Signin/Signing";
import DetailsProduct from "./Shop/DetailsProduct";
import Category from "./Admin/categorie/Category";
import AddCategory from "./Admin/categorie/AddCategory";
import Product from "./Admin/product/Product";
import Order from "./Admin/orders/Order";
import AddProduct from "./Admin/product/AddProduct";
import ShoppingCart from "./Shop/ShopingCart";
import Footer from "./Shop/Footer";
import PrivateRoute from "./Auth/PrivateRoute";

function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/register" exact component={Signup} />
        <Route path="/login" exact component={Signing} />
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/category" exact component={Category} />
        <PrivateRoute path="/Addcategory" exact component={AddCategory} />
        <PrivateRoute path="/product" exact component={Product} />
        <PrivateRoute path="/Addproduct" exact component={AddProduct} />
        <PrivateRoute path="/order" exact component={Order} />
        <Route path="/detailsproduct/:id" exact component={DetailsProduct} />
        <Route path="/shoppingCart" exact component={ShoppingCart} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
