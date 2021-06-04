import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";

import { addToCart } from "../redux/actions/cartActions";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetail);

  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));

    history.push("/cart");
  };

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [match, product]);

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="detailPageGrid">
            <div>
              {product.images && (
                <div>
                  <img
                    className="detailPageImage"
                    src={product.images.url}
                    alt={product.name}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="detailPageName">{product.name}</div>
              <div className="detailPagePrice">Rs.{product.price}</div>
              <div>
                <b style={{ fontSize: "20px" }}>status:</b>
                <span>
                  {" "}
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div>
                <b style={{ fontSize: "20px" }}>Qty:</b>
                {product.countInStock > 0 && (
                  <span>
                    {" "}
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </span>
                )}
              </div>
              <div style={{ padding: "10px" }}>
                <button
                  type="button"
                  className="formButton"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
              <div style={{ padding: "10px" }}>
                <b style={{ fontSize: "20px" }}>Description:</b>
                {product.description}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductScreen;