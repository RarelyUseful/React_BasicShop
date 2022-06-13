import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer, productReducer, shoppingReducer } from "./products/reducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    shopping: shoppingReducer,
    filtered: filtersReducer,
  },
});

/** Config file of Redux. "products" and "shopping" are paths to read wanted data with useSelector((state) => state.shopping.XYZ) */
