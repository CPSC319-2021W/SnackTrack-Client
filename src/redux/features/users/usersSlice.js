/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserById } from '../../../services/UserService';

const INITIAL_STATE = {
  userId: null,
  username: null,
  emailAddress: null,
  firstName: null,
  lastName: null,
  balance: null,
  isActive: null,
  isAdmin: null,
  isAuthenticated: false,
  error: null
};

const getUser = createAsyncThunk('users/getUserStatus', async (userId, thunkAPI) => {
  const user = await getUserById(userId);
  return user;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {
    simpleLogin: (state, action) => {
      const {
        user_id,
        first_name,
      } = action.payload;
      state.userId = user_id;
      state.firstName = first_name;
    }
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      const {
        user_id,
        username,
        email_address,
        first_name,
        last_name,
        balance,
        is_active,
        is_admin,
        is_authenticated
      } = action.payload;
      state.userId = user_id;
      state.username = username;
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
      state.username = null;
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

export const { simpleLogin } = usersSlice.actions;

export default usersSlice.reducer;
