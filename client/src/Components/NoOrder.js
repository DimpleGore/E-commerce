import { Link } from "react-router-dom";

function NewOrder() {
  return (
    <div>
      <h6>
        {" "}
        Please <Link to="/login">Login</Link> to see your orders...
      </h6>
    </div>
  );
}

export default NewOrder;
