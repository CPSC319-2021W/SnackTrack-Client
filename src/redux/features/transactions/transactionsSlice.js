import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isEditOrderOpen: false,
  orderToEdit: {
    transaction_id: null,
    user_id: null,
    transaction_type_id: null,
    snack_name: null,
    transaction_amount: null,
    quantity: null,
    transaction_dtm: null
  }
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: INITIAL_STATE,
  reducers: {
    setIsEditOrderOpen: (state, action) => {
      state.isEditOrderOpen = action.payload;
    },
    setOrderToEdit: (state, action) => {
      state.orderToEdit = action.payload;
    }
  }
});

export const { setIsEditOrderOpen, setOrderToEdit } = transactionsSlice.actions;

export default transactionsSlice.reducer;
