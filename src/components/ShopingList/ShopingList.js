import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ShopingList() {
  const dispatch = useDispatch();
  const shoppingstate = useSelector((state) => state.shopping.shoppingList);
  const shoppingIsLoading = useSelector((state) => state.shopping.isLoading);

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      console.log("Axios start");
      const res = await axios.get("http://localhost:9000/products/shopingList");
      dispatch({ type: "SET_INITIAL_SHOPPING_LIST", value: res.data });
    } catch (error) {
      console.log("Error while retreiving Shopping list", error);
      setIsLoading(false);
    }
    setIsLoading(false);
    console.log("Fetch ends");
  };
  const setIsLoading = (bool) => {
    dispatch({ type: "SET_SHOPPING_LOADING", value: bool });
  };
  const handleLeftClick = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:9000/products/shopingList/${id}`);
    } catch (e) {
      console.log("Error while deleting from Shopping list", e);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (shoppingIsLoading) {
      fetchData();
    }
  }, [shoppingIsLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shoping List</p>
        <div>
          {shoppingIsLoading && (
            <Box>
              <CircularProgress />
            </Box>
          )}
          {shoppingstate.length > 0 && (
            <ul>
              {shoppingstate.map((e, i) => (
                <li key={i} onClick={() => handleLeftClick(e.id)}>
                  {e.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default ShopingList;
