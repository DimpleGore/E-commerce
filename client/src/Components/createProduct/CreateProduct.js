import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import { getProducts as listProducts } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  name: "",
  price: "",
  description: "",
  countInStock: "",
  category: "",
  _id: "",
};

function CreateProduct(props) {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoryAPI.categories;
  const [images, setImages] = useState(true);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const history = useHistory();
  const param = useParams();

  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an admin");
      const file = e.target.files[0];

      if (!file) return "File not exist";

      if (file.size > 1024 * 1024) return alert("Size too large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect");

      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setImages(res.data);
    } catch (err) {
      console.log("error");
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You are not an admin");
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const backClick = () => {
    props.history.push("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an admin");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }

      setImages(false);
      setProduct(initialState);

      history.push("/dashboard");
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
  return (
    <div style={{ padding: "1%" }}>
      <center>
        <div className="formLayout">
          <h4 style={{ padding: "20px" }}>Add Product</h4>

          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td className="col">
                  <input
                    type="text"
                    className="field"
                    placeholder="Enter Product Name"
                    name="name"
                    id="name"
                    required
                    value={product.name}
                    onChange={handleChangeInput}
                  />
                </td>{" "}
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="textl"
                    className="field"
                    placeholder="Enter Product Price"
                    name="price"
                    id="price"
                    required
                    value={product.price}
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <textarea
                    name="description"
                    style={{
                      width: "100%",
                      border: "chartreuse",
                      margin: "8px -8px",
                    }}
                    placeholder="    Enter Product Description"
                    id="description"
                    required
                    value={product.description}
                    rows="3"
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td className="col">
                  <input
                    type="number"
                    className="field"
                    placeholder="Enter Count In Stock"
                    name="countInStock"
                    id="countInStock"
                    required
                    value={product.countInStock}
                    rows="3"
                    onChange={handleChangeInput}
                  />
                </td>
              </tr>

              <tr>
                <td style={{ padding: "20px" }}>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChangeInput}
                  >
                    <option value="">Please select a category</option>
                    {categories.map((category) => (
                      <option value={category.name} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "20px" }}>
                  <input type="file" name="file" onChange={handleUpload} />
                  <div id="file_img" style={styleUpload}>
                    <img
                      className="cartImage"
                      src={images ? images.url : ""}
                      alt=""
                    />
                    <span href="#" onClick={handleDestroy}>
                      X
                    </span>
                  </div>
                </td>
              </tr>
              <td style={{ padding: "30px" }}>
                <tr>
                  <button type="submit" className="formButton">
                    {onEdit ? "Update" : "Create"}
                  </button>
                </tr>
              </td>
            </table>
          </form>
          <div style={{ padding: "5px" }}>
            <button type="submit" className="backButton" onClick={backClick}>
              Back
            </button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default CreateProduct;
