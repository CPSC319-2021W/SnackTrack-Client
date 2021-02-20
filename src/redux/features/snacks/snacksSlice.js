import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSnacks } from '../../../services/SnacksService';

const INITIAL_STATE = {
  snacks: [],
  categories: [],
  loading: false,
  error: []
};

const fetchSnacks = createAsyncThunk('users/fetchSnacks', async () => {
  const snacks = await getSnacks();
  return snacks;
});

const snacksSlice = createSlice({
  name: 'snacks',
  initialState: INITIAL_STATE,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(category => category !== action.payload);
    }
  },
  extraReducers: {
    [fetchSnacks.pending]: (state) => {
      state.loading = true;
    },
    [fetchSnacks.fulfilled]: (state, action) => {
      const { snacks } = action.payload;
      state.loading = false;
      state.snacks = snacks;
    },
    [fetchSnacks.rejected]: (state, action) => {
      state.loading = false;
      state.error = [...action.payload];
    }
  }
});

export { fetchSnacks };

export const { addCategory, removeCategory } = snacksSlice.actions;

export default snacksSlice.reducer;
