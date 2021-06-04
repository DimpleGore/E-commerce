import { useContext } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../GlobalState";

function UserOrder({ match }) {
  const state = useContext(GlobalState);
  const [records] = state.userAPI.records;
  var serial = 0;

  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;

  return (
    <div>
      {records.map(
        (records) =>
          match.params.id === records._id && (
            <div>
              <tr>
                <td>
                  <b>Shipping Address:</b>
                  <span>{records.payment.notes.address}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Date of Purchasing:</b>
                  <span>
                    {new Date(records.header.date).toDateString()},
                    {new Date(records.header.date).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
            </div>
          )
      )}

      <table className="table table-borderless table-hover table-striped table-responsive-stack">
        <thead>
          {records && records.length !== 0 && (
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          )}
        </thead>
        {records && (
          <tbody>
            {records.map((records) => {
              return (
                match.params.id === records._id &&
                records.cart.map((item) => {
                  return (
                    <tr key={item.productId}>
                      <td>{(serial = serial + 1)}</td>
                      <td>
                        <img className="cartImage" src={item.image} alt="" />
                      </td>
                      <td>
                        <div className="cartName">{item.name}</div>
                      </td>
                      <td>
                        <div className="cartQuantity">{item.qty}</div>
                      </td>
                      <td>
                        <div className="cartPrice">
                          Rs.{item.price * item.qty}
                        </div>
                      </td>
                    </tr>
                  );
                })
              );
            })}

            {records &&
              records.map(
                (records) =>
                  match.params.id === records._id && (
                    <div>
                      {" "}
                      <b>Total Price: </b>
                      <span>Rs.{records.payment.amount / 100}</span>
                    </div>
                  )
              )}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default UserOrder;
