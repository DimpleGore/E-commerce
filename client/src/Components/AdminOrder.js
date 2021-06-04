import { GlobalState } from "../GlobalState";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminOrder() {
  const state = useContext(GlobalState);

  const [token] = state.token;

  const [order, setOrder] = state.userAPI.order;
  console.log(order)
  var serial = 0;

  return (
    <div>
      {order && order.length === 0 && <h4>No Orders</h4>}
      {order && order.length !== 0 && (
        <h4>You have order of {order.length} customers.</h4>
      )}

      <table className="table table-borderless table-hover table-striped table-responsive-stack">
        <thead>
          {order && order.length != 0 && (
            <tr>
              <th>Sr.No.</th>
              <th>Order Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Address</th>
            </tr>
          )}
        </thead>
        {order && (
          <tbody>
            {order.map((order) => (
              <tr key={order._id}>
                <td>{(serial = serial + 1)}</td>
                <td>{order.payment.order_id}</td>
                <td>{order.payment.notes.name}</td>
                <td>{order.payment.email}</td>
                <td>{order.payment.contact}</td>
                <td>
                  {order.payment.notes.address}
                </td>
                <td>
                  <Link to={`/viewOrders/${order._id}`}>View Orders</Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default AdminOrder;
