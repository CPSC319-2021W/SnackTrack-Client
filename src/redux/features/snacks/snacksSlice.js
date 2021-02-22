import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSnacks } from '../../../services/SnacksService';

const INITIAL_STATE = {
  snacks: [],
  selectedSnack: {image_uri: null, snack_id: null, price: null, snack_name: null, description: null},
  selectedFilters: [],
  loading: false,
  error: null
};

const fetchSnacks = createAsyncThunk('snacks/fetchSnacks', async () => {
  const snacks = await getSnacks();
  return snacks;
});

const snacksSlice = createSlice({
  name: 'snacks',
  initialState: INITIAL_STATE,
  reducers: {
    addCategory: (state, action) => {
      state.selectedFilters.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.selectedFilters = state.selectedFilters.filter(category => category !== action.payload);
    },
    selectOneSnack: (state, action) => {
      state.selectedSnack = action.payload;
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
      state.error = action.payload;
    }
  }
});

export { fetchSnacks };

export const { addCategory, removeCategory, selectOneSnack } = snacksSlice.actions;

export default snacksSlice.reducer;
