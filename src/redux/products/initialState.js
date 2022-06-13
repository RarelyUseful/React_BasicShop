/** Initial state of Products
 * it's empty array because we want to download products list from API when user clicks button.
 *
 * isLoading flags changes  */

export const initialProductState = {
  productsList: [],
  isLoading: false,
};

/** Initial state of Shopping List
 * it's empty array, but it loads data from API on first render (ShoppingList.js component)
 *
 * isLoading flags changes  */
export const initialShoppingListState = {
  shoppingList: [],
  isLoading: true,
};
