import commonColumnsStyles from "../../common/styles/Columns.module.scss";
// import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ShopingList() {
  const dispatch = useDispatch();
  const shoppingstate = useSelector((state) => state.shopping.shoppingList);
  const shoppingIsLoading = useSelector((state) => state.shopping.isLoading);
  // const apiUrl = "https://f90r7jsyq7.execute-api.eu-central-1.amazonaws.com/latest";

  const fetchData = async () => {
    // AWS Lambda doesn't work as intended when it has to store data, so i switched it for localstorage.
    try {
      // console.log("Shopping list calls API");
      // const res = await axios.get(apiUrl + "/products/shopingList");
      // dispatch({ type: "SET_INITIAL_SHOPPING_LIST", value: res.data });
    } catch (error) {
      console.log("Error while retreiving Shopping list", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const saveToLocalStorage = () => {
    window.localStorage.setItem("shoppingList", JSON.stringify(shoppingstate));
  };
  const setIsLoading = (bool) => {
    dispatch({ type: "SET_SHOPPING_LOADING", value: bool });
  };
  const handleLeftClick = async (id) => {
    setIsLoading(true);
    try {
      // await axios.delete(apiUrl + `/products/shopingList/${id}`);
      const listWithoutCurrentItem = shoppingstate.filter((item) => item.id !== id);
      dispatch({ type: "SET_INITIAL_SHOPPING_LIST", value: listWithoutCurrentItem });
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
    if (!shoppingIsLoading) {
      saveToLocalStorage();
    }
  }, [shoppingIsLoading, shoppingstate]); // eslint-disable-line react-hooks/exhaustive-deps
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
