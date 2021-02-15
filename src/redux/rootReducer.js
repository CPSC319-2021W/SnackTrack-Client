import AuthReducer from './features/auth/authSlice';
import UsersReducer from './features/users/usersSlice';

const rootReducer = {
  authReducer: AuthReducer,
  usersReducer: UsersReducer
};

export default rootReducer;
