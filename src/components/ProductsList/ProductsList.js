import React, { useEffect, useRef, useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myref = useRef(null);
  const productsState = useSelector((state) => state.filtered.productsList);
  const productsLoading = useSelector((state) => state.products.isLoading);
  const shoppingstate = useSelector((state) => state.shopping.shoppingList);

  const [selectedItem, setSelecteditem] = useState(0);
  const focusOnSelectedItem = () => {
    myref.current.focus();
    //TODO: this should happen when clicked on load button or comes back from details view
  };

  useEffect(() => {}, [productsState]);

  const setShoppingLoading = (bool) => {
    dispatch({ type: "SET_SHOPPING_LOADING", value: bool });
  };

  const handleLeftClick = async (data) => {
    setShoppingLoading(true);
    try {
      // await axios.post(apiUrl + "/products/shopingList/new", data);
      dispatch({
        type: "SET_INITIAL_SHOPPING_LIST",
        value: [...shoppingstate, data],
      });
    } catch (e) {
      console.log("ERROR", e);
      setShoppingLoading(false);
    }
    setShoppingLoading(false);
  };
  const handleRightClick = (event, id) => {
    event.preventDefault();
    navigate(`/products/productDetails/${id}`);
  };
  const handleKeyDown = (event, id) => {
    if (event.keyCode === 68) {
      //event.key === ("D" || "d") doesn't work for CapsLock+[D]
      let realId = Number(productsState[selectedItem].id);
      navigate(`/products/productDetails/${realId}`);
    }
    if (event.key === "ArrowUp") {
      if (selectedItem > 0) {
        setSelecteditem(selectedItem - 1);
      }
    }
    if (event.key === "ArrowDown") {
      if (selectedItem < productsState.length - 1) {
        setSelecteditem(selectedItem + 1);
      }
    }
  };

  return (
    <div
      ref={myref}
      tabIndex={0}
      onKeyDown={(event) => handleKeyDown(event)}
      onMouseOver={() => focusOnSelectedItem()}
      className={commonColumnsStyles.App}
    >
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products List</p>
        <div>
          {productsLoading && (
            <Box>
              <CircularProgress />
            </Box>
          )}
          {productsState.length > 0 && (
            <ul>
              {productsState.map((e, i) => (
                <li
                  key={e.id}
                  onClick={() => handleLeftClick(e)}
                  onContextMenu={(event) => handleRightClick(event, e.id)}
                >
                  {selectedItem === i ? (
                    <span
                      style={{
                        backgroundColor: "white",
                        border: "2px blue solid",
                        borderRadius: "10px",
                        padding: "1px",
                      }}
                    >
                      {e.name}
                    </span>
                  ) : (
                    <span>{e.name}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default ProductsList;
