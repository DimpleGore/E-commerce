import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../GlobalState";

function UserAPI(token) {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [id, setId] = useState(0);
  const [resp, setResp] = useState(null);
  const [records, setRecords] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setId(res.data._id);
          setResp(res);
          res.data.role === 0 ? setIsLogged(true) : setIsLogged(false);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert("error");
        }
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (isLogged) {
      const getRecords = async () => {
        const res = await axios.get("/user/myOrder", {
          headers: { Authorization: token },
        });
      
        setRecords(res.data);
      };
      getRecords();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isAdmin) {
      const getInfo = async () => {
        const resp = await axios.get("/api/adminorder", {
          headers: { Authorization: token },
        });

        setOrder(resp.data);
        
      };
      getInfo();
    }
  }, [isAdmin]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    id: [id, setId],
    resp: [resp, setResp],
    records: [records, setRecords],
    order: [order, setOrder],
  };
}

export default UserAPI;
