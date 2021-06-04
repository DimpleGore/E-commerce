import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoryAPI() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getCategories = async () => {
      const resp = await axios.get("/api/category");
      setCategories(resp.data);
    };
    getCategories();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

export default CategoryAPI;
