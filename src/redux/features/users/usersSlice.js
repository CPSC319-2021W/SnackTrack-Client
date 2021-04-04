import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserById } from '../../../services/UsersService';

const INITIAL_STATE = {
  profile: {
    userId: null,
    emailAddress: null,
    firstName: null,
    lastName: null,
    imageUri: null,
    balance: null,
    isAdmin: null
  }
};

const getUser = createAsyncThunk('users/getUsersStatus', async (userId) => {
  const user = await getUserById(userId);
  return user;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {
    simpleLogin: (state, action) => {
      const { user_id, first_name, last_name } = action.payload;
      state.profile.userId = user_id;
      state.profile.firstName = first_name;
      state.profile.lastName = last_name;
    },
    setBalance: (state, action) => {
      state.profile.balance = action.payload;
    },
    setUser: (state, action) => {
      const {
        user_id,
        email_address,
        first_name,
        last_name,
        image_uri,
        balance,
        is_admin
      } = action.payload;
      state.profile = {
        userId: user_id,
        emailAddress: email_address,
        firstName: first_name,
        lastName: last_name,
        imageUri: image_uri,
        balance: balance,
        isAdmin: is_admin
      };
    }
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      const {
        user_id,
        email_address,
        first_name,
        last_name,
        balance,
        is_active,
        is_admin,
        is_authenticated
      } = action.payload;
      state.userId = user_id;
      state.emailAddress = email_address;
      state.firstName = first_name;
      state.lastName = last_name;
      state.balance = balance;
      state.isActive = is_active;
      state.isAdmin = is_admin;
      state.isAuthenticated = is_authenticated;
    },
    [getUser.rejected]: (state, action) => {
      state.userId = null;
      state.emailAddress = null;
      state.firstName = null;
      state.lastName = null;
      state.balance = null;
      state.isActive = null;
      state.isAdmin = null;
      state.isAuthenticated = null;
      state.error = action.payload;
    }
  }
});

export { getUser };

export const { simpleLogin, setBalance, setUser } = usersSlice.actions;

export default usersSlice.reducer;
