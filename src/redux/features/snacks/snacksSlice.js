import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSnacks } from '../../../services/SnacksService';

const INITIAL_STATE = {
  snacks: [],
  selectedSnack: {
    snack_id: null,
    snack_name: null,
    description: null,
    image_uri: null,
    price: null,
    quantity: null,
    order_threshold: null
  },
  selectedFilters: [],
  snackBatches: [],
  selectedSnackForBatch: null,
  selectedBatch: {
    snack_batch_id: null,
    snack_id: null,
    quantity: 0,
    expiration_dtm: null
  },
  snackImageUploadData: null,
  isAddBatchOpen: false,
  isEditBatchOpen: false,
  loading: false,
  error: null,
  isAddSnackOpen: false,
  suggestions: []
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
    setIsAddBatchOpen: (state, action) => {
      state.isAddBatchOpen = action.payload;
    },
    setIsEditBatchOpen: (state, action) => {
      state.isEditBatchOpen = action.payload;
    },
    setSelectedBatch: (state, action) => {
      state.selectedBatch = action.payload;
    },
    setQuantity: (state, action) => {
      const { snackId, newQuantity } = action.payload;
      const { snacks } = state;
      const index = snacks.findIndex((snack) => snack.snack_id === snackId);
      state.snacks[index].quantity = snacks[index].quantity - newQuantity;
    },
    setIsAddSnackOpen: (state, action) => {
      state.isAddSnackOpen = action.payload;
    },
    setSnackImageUploadData: (state, action) => {
      state.snackImageUploadData = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setSuggestionState: (state, action) => {
      const { id, isActive } = action.payload;
      const { suggestions } = state;
      const index = suggestions.findIndex((suggestion) => suggestion.id === id);
      state.suggestions[index].isActive = !isActive;
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
  setIsAddBatchOpen,
  setIsEditBatchOpen,
  setQuantity,
  setIsAddSnackOpen,
  setSnackImageUploadData,
  setSuggestions,
  setSuggestionState
} = snacksSlice.actions;

export default snacksSlice.reducer;
