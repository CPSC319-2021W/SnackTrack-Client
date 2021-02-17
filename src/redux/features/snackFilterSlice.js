import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = [];

const snackFilterSlice = createSlice({
  name: 'snackFilter',
  initialState: INITIAL_STATE,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    removeCategory: (state, action) => {
      const currFilter = state.filter(curr => curr !== action.payload);
      //console.log(currFilter);
      state = currFilter;
      //state = action.payload;
    },
    setCategory: (state, action) => {
      state = action.payload;
    }
  }
});

export const {addCategory, removeCategory, setCategory} = snackFilterSlice.actions;

export default snackFilterSlice.reducer;
