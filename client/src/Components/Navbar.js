//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { GlobalState } from "../GlobalState";
import { Link } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

function Navbar(props) {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [val, setVal] = state.val;
  const [resp] = state.userAPI.resp;
  const [categories] = state.categoryAPI.categories;
  const [category, setCategory] = state.category;

  const divRef = useRef();

  const ulRef = useRef();
  const aRef = useRef();

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };
  const adminRouter = () => {
    return (
      <div
        className="dropdown"
        style={{ display: "flex", alignItems: "flex-end" }}
      >
        <div>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="45" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <a
              className="dropdown-item"
              href="/dashboard"
              style={{ color: "black" }}
            >
              Dashboard
            </a>
            <a
              className="dropdown-item"
              href="/dashboard"
              style={{ color: "black" }}
            >
              Create Product
            </a>
            <a
              className="dropdown-item"
              href="/dashboard"
              style={{ color: "black" }}
            >
              Create Category
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={logoutUser}
              style={{ color: "black" }}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  };

  const loggedRouter = () => {
    return (
      
        <div>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="45" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <a
              className="dropdown-item"
              href="#"
              onClick={logoutUser}
              style={{ color: "black" }}
            >
              Logout
            </a>
          </div>
        </div>
    
    );
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((index) => index + 1, 0);
  };

  function openNav() {
    divRef.current.style.width = "250px";
  }

  function closeNav() {
    divRef.current.style.width = "0";
  }

  const subCategory = () => {
    if (ulRef.current.style.display == "block") {
      ulRef.current.style.display = "none";
    } else {
      ulRef.current.style.display = "block";
    }
  };

  const clickHandle = (category) => {
    setCategory(category.name);
  };

  const categoryHandler = () => {
    setCategory("");
  };

  return (
    <div className="topnav">
      <div className='navigationBar'>
      
              <div id="mySidenav" className="sidenav" ref={divRef}>
                <a
                  href="javascript:void(0)"
                  className="closebtn"
                  onClick={() => closeNav()}
                >
                  &times;
                </a>
                {isAdmin && (
                  <h4 style={{ color: "white" }}>Hey, {resp.data.name}</h4>
                )}
                {isLogged && (
                  <h4 style={{ color: "white" }}>Hey, {resp.data.name}</h4>
                )}
                

                <a href="#" onClick={() => subCategory()}>
                  Categories
                </a>
                <ul ref={ulRef} style={{ display: "none" }}>
                  <a href="#" onClick={() => categoryHandler()}>
                    <li style={{ fontSize: "30px" }}>All Products</li>
                  </a>
                  {categories.map((category) => (
                    <a
                      ref={aRef}
                      href="#"
                      onClick={() => clickHandle(category)}
                    >
                      <li>{category.name}</li>
                    </a>
                  ))}
                </ul>
                {!isLogged && !isAdmin && <a href="/noOrder">My Order</a>}
                {isLogged && <a href="/order">My Order</a>}
                <br></br>
                {isAdmin && <a href="/adminOrder">My Order</a>}
                <br></br>
                {isAdmin ? "" : <a href="/cart">My Cart</a>}
                <a href="#">Contact</a>
              </div>
<div>
              <span
                style={{
                  "font-size": "30px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => openNav()}
              >
                &#9776;
              </span></div><div className='websiteName'>
              <a href="/" style={{textDecoration:'none',fontSize:'25px',fontWeight:'bold'}}>
                Smart Shop 
              </a>
           </div>
              <div>
              <input
            className='inputField'
                type="text"
                id="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                value={val}
                onInput={(e) => setVal(e.target.value)}
              /></div>
            
     <div>
              {isAdmin ? (
                ""
              ) : (
                <div>
                  <a style={{textDecoration:'none'}} href="/cart">
                    <i className="fas fa-shopping-cart"></i>
                    Cart <span>{getCartCount()}</span>
                  </a>
                </div>
              )}</div><div>
              
                {!isLogged && !isAdmin && 
                  <div style={{paddingTop:'5px'}}
                  >
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Login
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu2"
                    >
                      <a
                        className="dropdown-item"
                        href="/login"
                        style={{ color: "black" }}
                      >
                        Login
                      </a>
                      <a
                        className="dropdown-item"
                        href="/register"
                        style={{ color: "black" }}
                        type="button"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                }
              

              {isLogged && loggedRouter()}

   
      {isAdmin && adminRouter()}
  </div>
    </div>
    </div>
  );
}

export default Navbar;
