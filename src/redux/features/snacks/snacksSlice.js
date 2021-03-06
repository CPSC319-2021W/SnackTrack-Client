import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSnacks } from '../../../services/SnacksService';

const INITIAL_STATE = {
  snacks: [],
  selectedSnack: {
    snack_id: null,
    snack_name: null,
    description: null,
    image_uri: null,
    price: null
  },
  selectedFilters: [],
  snackBatches: [],
  selectedSnackForBatch: null,
  selectedBatch: {
    snack_id: null,
    quantity: 0,
    expiration_dtm: null
  },
  isManageBatchOpen: false,
  loading: false,
  error: null
};

const fetchSnacks = createAsyncThunk('snacks/fetchSnacks', async (activeOnly) => {
  const snacks = await getSnacks(activeOnly);
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
      state.selectedFilters = state.selectedFilters.filter(
        (category) => category !== action.payload
      );
    },
    selectOneSnack: (state, action) => {
      state.selectedSnack = action.payload;
    },
    deselectAllFilters: (state) => {
      state.selectedFilters = [];
    },
    setSnackBatches: (state, action) => {
      state.snackBatches = action.payload;
    },
    setSelectedSnackForBatch: (state, action) => {
      state.selectedSnackForBatch = action.payload;
    },
    setIsManageBatchOpen: (state, action) => {
      state.isManageBatchOpen = action.payload;
    },
    setSelectedBatch: (state, action) => {
      state.selectedBatch = action.payload;
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

export const {
  addCategory,
  removeCategory,
  selectOneSnack,
  deselectAllFilters,
  setSnackBatches,
  setSelectedSnackForBatch,
  setSelectedBatch,
  setIsManageBatchOpen
} = snacksSlice.actions;

export default snacksSlice.reducer;
