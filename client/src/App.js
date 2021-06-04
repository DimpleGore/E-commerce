//import logo from './logo.svg';
//import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Login from "./Components/authScreens/Login";
import Register from "./Components/authScreens/Register";
import { DataProvider } from "./GlobalState";
import Categories from "./Components/Category/Categories";
import CreateProduct from "./Components/createProduct/CreateProduct";
import { GlobalState } from "./GlobalState";
import React, { useContext } from "react";
import NotFound from "./Components/NotFound";
import AddressScreen from "./Components/AddressScreen";
import ReviewScreen from "./Components/ReviewScreen";
import OrderInfor from "./Components/OrderInfor";
import AdminOrder from "./Components/AdminOrder";
import ViewOrder from "./Components/ViewOrder";
import AdminDashboard from "./Components/AdminDashboard";
import NoOrder from "./Components/NoOrder";
import UserOrder from "./Components/UserOrder";

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route
            exact
            path="/dashboard"
            component={isAdmin ? AdminDashboard : NotFound}
          />

          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/login" component={isLogged ? NotFound : Login} />
          <Route
            exact
            path="/register"
            component={isLogged ? NotFound : Register}
          />
          <Route
            exact
            path="/category"
            component={isAdmin ? Categories : NotFound}
          />
          <Route
            exact
            path="/create_product"
            component={isAdmin ? CreateProduct : NotFound}
          />
          <Route
            exact
            path="/edit_product/:id"
            component={isAdmin ? CreateProduct : NotFound}
          />
          <Route exact path="/address" component={AddressScreen} />
          <Route exact path="/review" component={ReviewScreen} />
          <Route
            exact
            path="/order"
            component={isLogged ? OrderInfor : NotFound}
          />
          <Route
            exact
            path="/adminOrder"
            component={isAdmin ? AdminOrder : NotFound}
          />
          <Route
            exact
            path="/viewOrders/:id"
            component={isAdmin ? ViewOrder : NotFound}
          />
          <Route exact path="/noOrder" component={NoOrder} />
          <Route exact path="/userorder/:id" component={UserOrder} />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
