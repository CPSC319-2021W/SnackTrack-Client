import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  searchValue: ''
};

const searchbarSlice = createSlice({
  name: 'searchbar',
  initialState: INITIAL_STATE,
  reducers: {
    setValue: (state, action) => {
      state.searchValue = action.payload;
    }
  }
});

export const { setValue } = searchbarSlice.actions;

export default searchbarSlice.reducer;
