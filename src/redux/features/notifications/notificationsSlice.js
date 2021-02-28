import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isToastNotificationOpen: false,
  apiResponse: 'ERROR'
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: INITIAL_STATE,
  reducers: {
    setToastNotificationOpen: (state, action) => {
      state.isToastNotificationOpen = action.payload;
    },
    setApiResponse: (state, action) => {
      state.apiResponse = action.payload;
    }
  }
});

export const { setToastNotificationOpen, setApiResponse } = notificationsSlice.actions;

export default notificationsSlice.reducer;
