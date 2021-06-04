import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../GlobalState";
import { getProducts as listProducts } from "../redux/actions/productActions";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateProduct from "./createProduct/CreateProduct";

function AdminDashboard({ history }) {
  const dispatch = useDispatch();
  const state = useContext(GlobalState);
  const [val] = state.val;
  const [category] = state.category;
  var serial = 0;
  const [token] = state.token;
  const [callback, setCallback] = useState(false);

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts(val, category));
  }, [callback, val, category]);

  const deleteProduct = async (productId, publicId) => {
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editProduct = (id) => {
    history.push(`/edit_product/${id}`);
  };

  const createProduct = () => {
    history.push("/create_product");
  };

  const createCategory = () => {
    history.push("/category");
  };

  return (
    <div>
      <center>
        <h4 style={{ padding: "20px" }}>Admin Dashboard</h4>
      </center>
      <br />
      <br />
      <center>
        <table>
          <tr>
            <td style={{ padding: "20px" }}>
              <button className="addButton" onClick={createProduct}>
                +
              </button>
            </td>
            <td>
              <button className="createButton" onClick={createCategory}>
                Create Category
              </button>
            </td>
          </tr>
        </table>
        <table className="table table-borderless table-hover table-striped table-responsive-stack">
         {products.length!==0 &&  <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Product Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Count In Stock</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>}
          {products && (
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{(serial = serial + 1)}</td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      type="button"
                      href="#"
                      onClick={() => editProduct(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      href="#"
                      onClick={() =>
                        deleteProduct(product._id, product.images.public_id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </center>
    </div>
  );
}

export default AdminDashboard;
