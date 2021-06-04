import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div style={{ padding: "10%" }}>
      <center>
        <div className="formLayout">
          <h4 style={{ padding: "30px" }}>Registration Form</h4>
          <h6 style={{ color: "red" }}>{error}</h6>

          <form onSubmit={registerSubmit}>
            <table>
              <tr>
                <td className="col">
                  <input
                    type="text"
                    className="field"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={onChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="email"
                    className="field"
                    name="email"
                    id="exampleDropdownFormEmail1"
                    placeholder="email@example.com"
                    value={user.email}
                    onChange={onChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="password"
                    className="field"
                    name="password"
                    id="exampleDropdownFormPassword1"
                    placeholder="Password"
                    value={user.password}
                    onChange={onChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td style={{ padding: "30px" }}>
                  <button type="submit" className="formButton">
                    Register
                  </button>
                </td>
              </tr>
            </table>
          </form>
          <a className="dropdown-item" href="/login">
            Already you have an account ? <b style={{ color: "blue" }}>Login</b>
          </a>
        </div>
      </center>
    </div>
  );
}
export default Register;
