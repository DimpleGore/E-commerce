import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { GlobalState } from "../GlobalState";

function AddressScreen(props) {
  const state = useContext(GlobalState);
  const [id] = state.userAPI.id;
  const [token] = state.token;

  const [user, setUser] = useState({
    address: "",
    mobileNumber: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.history.push({
      pathname:"/review",
      state: {
        user: user
      }
    });
  };

  const backClick = () => {
    props.history.push("/cart");
  };

  return (
    <div style={{ padding: "4%" }}>
      <center>
        <div className="formLayout">
          <h4 style={{ padding: "20px" }}>Address Form</h4>
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td className="col">
                  <input
                    type="textarea"
                    className="field"
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={user.address}
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="text"
                    name="mobileNumber"
                    className="field"
                    id="mobileNumber"
                    placeholder="Mobile Number"
                    value={user.mobileNumber}
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="text"
                    className="field"
                    name="pincode"
                    id="pincode"
                    placeholder="Pincode"
                    value={user.pincode}
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="text"
                    className="field"
                    name="city"
                    id="city"
                    placeholder="City"
                    value={user.city}
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="text"
                    className="field"
                    name="state"
                    id="state"
                    placeholder="State"
                    value={user.state}
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td style={{ padding: "30px" }}>
                  <button className="formButton" type="submit">
                    Pay with Razorpay
                  </button>
                </td>
              </tr>
            </table>
          </form>
          <div style={{ padding: "5px" }}>
            <button className="backButton" type="submit" onClick={backClick}>
              Back
            </button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default AddressScreen;
