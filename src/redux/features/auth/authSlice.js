import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  profile: { userId: null, email: null, firstName: null, lastName: null, imageUri: null }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setLoginSuccess: (state, action) => {
      const { user_id, email_address, first_name, last_name, image_uri } = action.payload;
      state.profile = {
        userId: user_id,
        email: email_address,
        firstName: first_name,
        lastName: last_name,
        imageUri: image_uri
      };
    },
    setLogout: (state) => {
      state.profile = { INITIAL_STATE };
    }
  }
});

export const { setLoginSuccess, setLogout } = authSlice.actions;

export default authSlice.reducer;
