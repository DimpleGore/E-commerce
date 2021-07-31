import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/login", { ...user });
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
          <h4 style={{ padding: "30px" }}>Login</h4>
          <h6 style={{ color: "red" }}>{error}</h6>
          <form onSubmit={loginSubmit}>
            <table>
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
                    Login
                  </button>
                 
                </td>
              </tr>
            </table>
          </form>
    
       

          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/register">
            New around here? <h6 style={{ color: "blue" }}>Register</h6>
          </a>
        </div>
      </center>
    </div>
  );
}
export default Login;
