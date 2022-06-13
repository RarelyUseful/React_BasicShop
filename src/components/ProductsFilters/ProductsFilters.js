import React, { useState, useEffect } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

function ProductsFilters() {
  const dispatch = useDispatch();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isFoodFilter, setIsFoodFilter] = useState(false);
  const [isNotFoodFilter, setIsNotFoodFilter] = useState(false);
  const initialProductsList = useSelector((state) => state.products.productsList);
  const [lastSearch, setLastSearch] = useState();

  const resetFilteredList = () => {
    dispatch({
      type: "SET_INITIAL_FILTERED_LIST",
      value: initialProductsList,
    });
  };
  const handleSearchPhraseChange = (event) => {
    setLastSearch(event);
    if (event.target.value.length < searchPhrase.length) {
      resetFilteredList();
      setSearchPhrase(event.target.value);
      dispatch({ type: "SEARCH_NAME", value: event.target.value });
      if (isFoodFilter) {
        dispatch({ type: "SET_FILTER_IS_FOOD", value: true });
      }
      if (isNotFoodFilter) {
        dispatch({ type: "SET_FILTER_IS_FOOD", value: false });
      }
    } else {
      setSearchPhrase(event.target.value);
      dispatch({ type: "SEARCH_NAME", value: event.target.value });
    }
  };
  const toggleIsFood = () => {
    if (!isFoodFilter) {
      dispatch({ type: "SET_FILTER_IS_FOOD", value: true });
      setIsFoodFilter(true);
    } else if (isFoodFilter) {
      resetFilteredList();
      setIsFoodFilter(false);
    }
    if (isNotFoodFilter) {
      dispatch({ type: "SET_FILTER_IS_FOOD", value: false });
    }
    if (lastSearch) {
      handleSearchPhraseChange(lastSearch); //this fixes filters, so i can check/uncheck Food only box during search
    }
  };
  /** THIS WASN'T IN REQUIREMENTS, but i just wanted to see if i can make it bug-free */
  const toggleIsNotFood = () => {
    if (!isNotFoodFilter) {
      dispatch({ type: "SET_FILTER_IS_FOOD", value: false });
      setIsNotFoodFilter(true);
    } else if (isNotFoodFilter) {
      resetFilteredList();
      setIsNotFoodFilter(false);
    }
    if (isFoodFilter) {
      dispatch({ type: "SET_FILTER_IS_FOOD", value: true });
    }
    if (lastSearch) {
      handleSearchPhraseChange(lastSearch); //fix like above
    }
  };
  useEffect(() => {
    //console.log(productsState);
  }, [searchPhrase]);
  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Search Products: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                margin="dense"
                label="Product Name"
                variant="outlined"
                value={searchPhrase}
                onChange={(event) => handleSearchPhraseChange(event)}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            onChange={() => {
              toggleIsFood();
            }}
            checked={isFoodFilter}
            label="Show Food Only"
          />
          <FormControlLabel
            control={<Checkbox />}
            onChange={() => {
              toggleIsNotFood();
            }}
            checked={isNotFoodFilter}
            label="Show NOT Food Only"
          />
        </div>
      </FormGroup>
    </div>
  );
}

export default ProductsFilters;
