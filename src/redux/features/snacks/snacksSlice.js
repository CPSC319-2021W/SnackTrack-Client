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
  selectedSnackToEdit: {},
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
  isEditSnackOpen: false,
  suggestions: [],
  popularSnacks: []
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
    setSelectedSnackToEdit: (state, action) => {
      state.selectedSnackToEdit = action.payload;
    },
    setIsEditSnackOpen: (state, action) => {
      state.isEditSnackOpen = action.payload;
    },
    setSnackImageUploadData: (state, action) => {
      state.snackImageUploadData = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setSuggestionStateFalse: (state, action) => {
      const { suggestions } = state;
      const { id } = action.payload;
      const index = suggestions.findIndex((suggestion) => suggestion.id === id);
      const recentlyUpdatedIndex = suggestions.findIndex(
        (suggestion) => suggestion.recentlyUpdated === true
      );
      if (recentlyUpdatedIndex !== -1) {
        state.suggestions[recentlyUpdatedIndex].recentlyUpdated = false;
      }
      state.suggestions[index].isActive = false;
    },
    setSuggestionState: (state, action) => {
      const { suggestions } = state;
      const { id, isActive } = action.payload;
      const index = suggestions.findIndex((suggestion) => suggestion.id === id);
      const recentlyUpdatedIndex = suggestions.findIndex(
        (suggestion) => suggestion.recentlyUpdated === true
      );
      if (recentlyUpdatedIndex !== -1) {
        state.suggestions[recentlyUpdatedIndex].recentlyUpdated = false;
      }
      state.suggestions[index].isActive = !isActive;
      state.suggestions[index].recentlyUpdated = true;
    },
    clearActiveStates: (state) => {
      const { suggestions } = state;
      suggestions.map((suggestion) => (suggestion.isActive = false));
    },
    setPopularSnacks: (state, action) => {
      state.popularSnacks = action.payload;
    },
    setSnacks: (state, action) => {
      state.snacks = action.payload.sort((a, b) => {
        return a.snack_name.localeCompare(b.snack_name);
      });
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
  setSelectedSnackToEdit,
  setIsEditSnackOpen,
  setSnackImageUploadData,
  setSuggestions,
  setSuggestionStateFalse,
  setSuggestionState,
  clearActiveStates,
  setPopularSnacks,
  setSnacks
} = snacksSlice.actions;

export default snacksSlice.reducer;
