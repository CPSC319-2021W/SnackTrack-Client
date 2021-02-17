import AuthReducer from './features/auth/authSlice';
import SnackReducer from './features/snackSlice';
import UsersReducer from './features/users/usersSlice';

const rootReducer = {
  authReducer: AuthReducer,
  usersReducer: UsersReducer,
  snackReducer: SnackReducer
};

export default rootReducer;
