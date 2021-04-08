import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  shoppingList: []
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: INITIAL_STATE,
  reducers: {
    setShoppingList: (state, action) => {
      state.shoppingList = action.payload;
    },
    addShoppingListItem: (state, action) => {
      state.shoppingList.push(action.payload);
    },
    addShoppingListItems: (state, action) => {
      const newShoppingList = state.shoppingList.concat(action.payload);
      state.shoppingList = newShoppingList;
    },
    removeShoppingListItem: (state, action) => {
      const index = state.shoppingList.findIndex(
        (item) => item.snack_name === action.payload.snack_name
      );
      state.shoppingList.splice(index, 1);
    }
  }
});

export const {
  setShoppingList,
  addShoppingListItem,
  addShoppingListItems,
  removeShoppingListItem
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
