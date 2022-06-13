import React, { useState, useEffect, useRef } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  /** this component doesn't write data to Redux, as it shows only one item and forces update everytime */
  const params = useParams();
  const navigate = useNavigate();
  const myref = useRef(null);
  const [itemDetails, setItemDetails] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/products/${params.id}`);
      setItemDetails(response.data);
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  const handleKeyDown = (event) => {
    console.log("User pressed: " + event.key);
    if (event.key === "Backspace") {
      navigate("/products/dashboard");
    }
  };
  useEffect(() => {
    fetchData();
    myref.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={commonColumnsStyles.App}
      ref={myref}
      tabIndex={0}
      onKeyDown={(event) => handleKeyDown(event)}
    >
      <header className={commonColumnsStyles.AppHeader}>
        <p>Product details:</p>
        {!!!itemDetails && <p>Loading...</p>}
        {!!itemDetails > 0 && (
          <div>
            {Object.keys(itemDetails).map((key) => {
              return <div key={key}>{key + ": " + itemDetails[key]}</div>;
            })}
          </div>
        )}
      </header>
    </div>
  );
}

export default ProductDetails;
