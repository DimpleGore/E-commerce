import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import HomeScreen from "./screens/HomeScreen";
import UserAPI from "./API/UserAPI";
import CategoryAPI from "./API/CategoryAPI";
import AddressScreen from "./Components/AddressScreen";


export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [category, setCategory] = useState("");
  const [val, setVal] = useState("");
 // const [google, setGoogle] = useState(null)

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

 
 /* useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const { displayName, email }  = user;
      setGoogle({
        displayName,
        email
      })
    })
      },[])*/
    

  const state = {
    token: [token, setToken],
     
    userAPI: UserAPI(token),
    categoryAPI: CategoryAPI(),
    category: [category, setCategory],
    val: [val, setVal],
    //user: [user, setUser]
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
