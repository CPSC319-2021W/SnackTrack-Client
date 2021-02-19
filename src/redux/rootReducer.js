import AuthReducer from './features/auth/authSlice';
import SearchbarReducer from './features/searchbar/searchbarSlice';
import SnackReducer from './features/snackSlice';
import UsersReducer from './features/users/usersSlice';

const rootReducer = {
  authReducer: AuthReducer,
  usersReducer: UsersReducer,
  snackReducer: SnackReducer,
  searchbarReducer: SearchbarReducer
};

export default rootReducer;
