import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts as listProducts } from "../redux/actions/productActions";
import {Pagination} from 'antd'
import "antd/dist/antd.css";



import { GlobalState } from "../GlobalState";
import React, { useContext } from "react";

function HomeScreen(props) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = useState(false);
  const [val, setVal] = state.val;

  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const [category] = state.category;

  const { products, loading} = getProducts;
  console.log(products)

  useEffect(() => {
    dispatch(listProducts(val, category));
  }, [callback, val, category]);

  const imageClick = (id) => {
    props.history.push("/product/" + id);
  };

  const textClick = (id) => {
    props.history.push(`/product/${id}`);
  };

  return (
    <div>
      <div>
        {loading && <h2>Loading...</h2>}
        {products && products.length===0 && <h4>No results found...</h4>}

        <div className="homeGrid">
        
          {products &&
            products.map((product) => (
              <div key={product._id}  className='endBorder'>
                <div>
                  <img
                    src={product.images.url}
                    className="image"
                    onClick={() => imageClick(product._id)}
                  />
                </div>
                <div
                  className="name"
                  href="#"
                  onClick={() => textClick(product._id)}
                >
                  {product.name}{" "}
                </div>
                <div className="price">Rs.{product.price}</div>
              </div>
            ))}
        </div>
      </div>
      
    </div>
  );
}

export default HomeScreen;
