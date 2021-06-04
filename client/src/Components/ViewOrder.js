import { GlobalState } from "../GlobalState";
import { useContext } from "react";

function ViewOrder({ match }) {
  const state = useContext(GlobalState);
  const [order] = state.userAPI.order;

  var serial = 0;

  return (
    <div>
      {order.map(
        (order) =>
          match.params.id === order._id && (
            <div>
              <tr>
                <td>
                  <b>Shipping Address:</b>
                  <span>{order.payment.notes.address}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Date of Purchasing:</b>
                  <span>
                    {new Date(order.header.date).toDateString()},
                    {new Date(order.header.date).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
            </div>
          )
      )}

      <table className="table table-borderless table-hover table-striped table-responsive-stack">
        <thead>
          {order && order.length !== 0 && (
            <tr>
              <th>Sr.No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          )}
        </thead>

        {order && (
          <tbody>
            {order.map(
              (order) =>
                match.params.id === order._id &&
                order.cart.map((item) => (
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
                ))
            )}

            {order &&
              order.map(
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

export default ViewOrder;
