import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { GlobalState } from "../GlobalState";

function CartScreen(props) {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;

  var serial = 0;

 
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((index) => index + 1, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

 const payment = () => {
  
    if (!isLogged) return alert("Please login to continue buying");
    window.location.href = "/address";

  };

  const imageClick = (id) => {
    props.history.push("/product/" + id);
  };
  return (
    <div>
      <h5>Shopping Cart</h5>

      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          <table className="table table-borderless table-hover table-striped table-responsive-stack">
            <thead>
              <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            {cartItems.map((item) => (
              <tbody>
                <tr>
                  <th scope="row">{(serial = serial + 1)}</th>
                  <td>
                    <div>
                      <img
                        className="cartImage"
                        src={item.image}
                        onClick={() => imageClick(item.productId)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="cartName">{item.name}</div>
                  </td>

                  <td>
                    {" "}
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        qtyChangeHandler(item.productId, e.target.value)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="cartPrice">
                      Rs.{item.price*item.qty}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => removeHandler(item.productId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
      {cartItems.length !== 0 && (
        <div className='cartBox'>
          <div style={{ padding: "20px" }} className="formLayout">
            <div
              style={{
                padding: "10px",
                paddingBottom: "2px",
                paddingLeft: "2px",
              }}
            >
              <b>Subtotal ({getCartCount()}) items</b>
            </div>
            <div style={{ paddingBottom: "20px" }}>
              Rs.{getCartSubTotal().toFixed(2)}
            </div>
            <center>
              <button
                style={{ width: "350px", height: "40px", borderRadius: "8px" }}
                onClick={payment}
              >
                Proceed To Pay
              </button>
            </center>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
export default CartScreen;
