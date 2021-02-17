import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  categories: []
};

const snackSlice = createSlice({
  name: 'snackFilter',
  initialState: INITIAL_STATE,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(category => category !== action.payload);
    }
  }
});

export const {addCategory, removeCategory} = snackSlice.actions;

export default snackSlice.reducer;
