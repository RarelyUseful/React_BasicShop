import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch();
  const apiUrl = 'https://f90r7jsyq7.execute-api.eu-central-1.amazonaws.com/latest';

  const handleClick = async () => {
    dispatch({ type: "SET_PRODUCTS_LOADING", value: true });
    try {
      const response = await axios.get(apiUrl+`/products`);
      dispatch({ type: "SET_INITIAL_PRODUCTS_LIST", value: response.data });
      dispatch({ type: "SET_INITIAL_FILTERED_LIST", value: response.data });
    } catch (e) {
      console.log("ERROR", e);
    }
    dispatch({ type: "SET_PRODUCTS_LOADING", value: false });
  };
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Signed in: {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button variant="contained" onClick={() => handleClick()}>
          Load Products
        </Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Sign out
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
