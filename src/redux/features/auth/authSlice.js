import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  profile: { token: null, email: null, firstName: null, lastName: null, imageUri: null }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setLoginSuccess: (state, action) => {
      const { googleId, email, givenName, familyName, imageUrl } = action.payload.profile;
      state.profile = {
        token: googleId,
        email: email,
        firstName: givenName,
        lastName: familyName,
        imageUri: imageUrl
      };
    },
    setLogout: (state) => {
      state.profile = {
        token: null,
        email: null,
        firstName: null,
        lastName: null,
        imageUri: null
      };
    }
  }
});

export const { setLoginSuccess, setLogout } = authSlice.actions;

export default authSlice.reducer;
