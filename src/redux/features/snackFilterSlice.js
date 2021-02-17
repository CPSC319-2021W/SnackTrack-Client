import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  categories: []
};

const snackFilterSlice = createSlice({
  name: 'snackFilter',
  initialState: INITIAL_STATE,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      if (state.categories.includes(action.payload)) {
        state.categories = state.categories.filter(category => category !== action.payload);
      }
    }
  }
});

export const {addCategory, removeCategory} = snackFilterSlice.actions;

export default snackFilterSlice.reducer;
