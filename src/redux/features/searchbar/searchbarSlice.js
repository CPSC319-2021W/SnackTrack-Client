import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  usersSearchValue: '',
  snackSearchValue: ''
};

const searchbarSlice = createSlice({
  name: 'searchbar',
  initialState: INITIAL_STATE,
  reducers: {
    setUserSearchValue: (state, action) => {
      state.usersSearchValue = action.payload;
    },
    setSnackSearchValue: (state, action) => {
      state.snackSearchValue = action.payload;
    }
  }
});

export const { setUserSearchValue, setSnackSearchValue } = searchbarSlice.actions;

export default searchbarSlice.reducer;
