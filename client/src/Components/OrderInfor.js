import { GlobalState } from "../GlobalState";

import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

function OrderInfor() {
  const state = useContext(GlobalState);
  var serial = 0;

  const [records, setRecords] = state.userAPI.records;

  const cart = records.map((records) => records.cart);
  console.log(cart);

  return (
    <div>
      {records && records.length === 0 && <h6>No Order</h6>}

      <table className="table table-borderless table-hover table-striped table-responsive-stack">
        <thead>
          {records && records.length !== 0 && (
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Order Id</th>
              <th scope="col">Items</th>
              <th scope="col">Status</th>
            </tr>
          )}
        </thead>
        {records && (
          <tbody>
            {records.map((records) => (
              <tr>
                <td>
                  <div className="cartName">{(serial = serial + 1)}</div>
                </td>
                <td>
                  <div className="cartName">{records.payment.order_id}</div>
                </td>
                <td>
                  <div className="cartName">{records.cart.length}</div>
                </td>
                <td>
                  <div>{records.payment.status}</div>
                </td>
                <td>
                  <Link to={`/userorder/${records._id}`}>View Order</Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default OrderInfor;
