import { initialProductState, initialShoppingListState } from "./initialState";

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_INITIAL_PRODUCTS_LIST":
      return { ...state, productsList: action.value };
    case "SET_PRODUCTS_LOADING":
      return { ...state, isLoading: action.value };
    default:
      return state;
  }
};
export const filtersReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_INITIAL_FILTERED_LIST":
      return { ...state, productsList: action.value };
    case "SET_FILTERED_LOADING":
      return { ...state, isLoading: action.value };
    case "SET_FILTER_IS_FOOD":
      return {
        ...state,
        productsList: state.productsList.filter((e) => e.isFood === !!action.value),
      };
    case "SEARCH_NAME":
      return {
        ...state,
        productsList: state.productsList.filter((e) =>
          e.name.toLowerCase().includes(action.value.toLowerCase())
          // productList: state.originalPL.filter...
        ),
      };
    default:
      return state;
  }
};

export const shoppingReducer = (state = initialShoppingListState, action) => {
  switch (action.type) {
    case "SET_INITIAL_SHOPPING_LIST":
      return { ...state, shoppingList: action.value };
    case "SET_SHOPPING_LOADING":
      return { ...state, isLoading: action.value };

    default:
      return state;
  }
};
/** Config file of Redux. Used to save data. Usage:
 * const dispatch = useDispatch();
 * dispatch({ type: "SET_SOMETHING_DEFINED_ABOVE", value: DATA_HERE })
 */
