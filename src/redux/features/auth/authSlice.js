import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  token: null,
  profile: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    // TODO: Implement Reducers
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    }
  }
});

export const { setToken, setProfile } = authSlice.actions;

export default authSlice.reducer;
