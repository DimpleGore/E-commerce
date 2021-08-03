import { GlobalState } from "../GlobalState";
import { useContext, useEffect, useState } from "react";
import CartScreen from "../screens/CartScreen";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

function ReviewScreen(props) {
  const state = useContext(GlobalState);
  const [resp] = state.userAPI.resp;
  const [id] = state.userAPI.id;
  const [token] = state.token;

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [records] = state.userAPI.records;
  var user = props.location.state.user;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [carts, setCarts] = useState(cartItems);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  const backClick = () => {
    props.history.push("/address");
  };

  const placedOrder = async (e) => {
    e.preventDefault();

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    } else {
      alert(res);
    }

    // creating a new order
    const result = await axios.post("/payment/orders", {
      price: getCartSubTotal(),
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Smart Corp Limited",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          cart: carts,
          amount: amount,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "/payment/verification",
          data
        );

        const res = await axios.post(
          "/payment/capture",
          data,
          {
            headers: { Authorization: token },
          }
        );

        alert(result.data.msg);

        Cookies.remove("cartItems");
        window.location.href = "/";
      },
      modal: {
        ondismiss: async function () {
          alert("Checkout form closed");
        },
      },

      prefill: {
        name: resp.data.name,
        email: resp.data.email,
        contact: user.mobileNumber,
      },
      notes: {
        address:
          user.address +
          "," +
          user.city +
          "," +
          user.state +
          "," +
          user.pincode,
        name: resp.data.name,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div style={{ padding: "5%" }}>
      <center>
        <div className="formLayout">
          <h4 style={{ padding: "30px" }}>
            Verify your personal details to proceed further...
          </h4>
          <table style={{ padding: "20px" }}>
            <b className="review">Name:</b>{" "}
            {resp && <span className="reviewData">{resp.data.name}</span>}
            <br />
            <b className="review">Email:</b>{" "}
            {resp && <span className="reviewData">{resp.data.email}</span>}
            <br />
            <b className="review">Mobile Number:</b>{" "}
            {user && <span>{user.mobileNumber}</span>}
            <br />
            <b className="review">Address:</b>{" "}
            {user && (
              <span style={{ paddingLeft: "60px" }}>
                {user.address}, {user.city}, {user.state}, {user.pincode}
              </span>
            )}
            <br />
            <b className="review">Total Items:</b>{" "}
            <span style={{ paddingLeft: "40px" }}>{getCartCount()}</span>
            <br />
            <b className="review">Total Amount:</b>{" "}
            <span style={{ paddingLeft: "20px" }}>{getCartSubTotal()}</span>
            <br />
            <b className="review"> Payment Mode:</b>
            <span style={{ paddingLeft: "10px" }}>Online-Razorpay</span>
            <div className="review">
              Click on <b>Confirm</b> button to place order your successfully
            </div>
            <center>
              {" "}
              <button
                type="submit"
                className="formButton"
                onClick={placedOrder}
              >
                Confirm
              </button>
            </center>
            <center style={{ padding: "10px" }}>
              {" "}
              <button type="submit" className="backButton" onClick={backClick}>
                Back
              </button>
            </center>
            <div style={{ padding: "20px" }}></div>
          </table>
        </div>
      </center>
    </div>
  );
}

export default ReviewScreen;
