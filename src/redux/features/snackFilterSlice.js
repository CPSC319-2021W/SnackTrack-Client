import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  category: null
};

const snackFilterSlice = createSlice({
  name: 'snackFilter',
  initialState: INITIAL_STATE,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    }
  }
});

export const {setCategory} = snackFilterSlice.actions;

export default snackFilterSlice.reducer;
