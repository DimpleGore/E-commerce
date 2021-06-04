import axios from "axios";
import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";

function Categories(props) {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoryAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoryAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  var serial = 0;

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }

      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const backClick = () => {
    props.history.push("/dashboard");
  };

  return (
    <div style={{ padding: "10px " }}>
      <div className="categoryGrid">
        <div className="formLayout">
          <center>
            <form onSubmit={createCategory}>
              <center>
                <h4>Create Category</h4>
              </center>

              <table>
                <tr>
                  <td className="col">
                    <input
                      type="text"
                      className="field"
                      name="category"
                      id="exampleDropdownFormName1"
                      placeholder="Category"
                      value={category}
                      required
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "30px" }}>
                    <button type="submit" className="formButton">
                      {onEdit ? "Update" : "Create"}
                    </button>
                  </td>
                </tr>
              </table>
            </form>
          </center>
          <center style={{ padding: "1px" }}>
            <button type="submit" className="backButton" onClick={backClick}>
              Back
            </button>
          </center>
        </div>

        <div style={{ padding: "40px" }}>
          <table className="table table-borderless table-hover table-striped table-responsive-stack">
          {categories.length!==0 &&  <thead>
              <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Categories</th>
                
                
                  <th style={{columnSpan:'2'}} scope="col">Action</th>
               
              </tr>
            </thead>}
            {categories.map((category) => (
              <tr key={category._id} className="categoryRow">
                <td className="categoryCol">{(serial = serial + 1)}</td>
                <td className="categoryCol">
                  <h5>{category.name}</h5>
                </td>
                <td style={{ margin: "20px" }}>
                  <button
                    onClick={() => editCategory(category._id, category.name)}
                  >
                    Edit
                  </button>&nbsp;
                  
                  {" "}
                  <button onClick={() => deleteCategory(category._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Categories;
