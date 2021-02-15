import AuthReducer from './features/auth/authSlice';
import SnackFilterReducer from './features/snackFilterSlice';
import UsersReducer from './features/users/usersSlice';

const rootReducer = {
	authReducer: AuthReducer,
  usersReducer: UsersReducer,
	snackFilterReducer: SnackFilterReducer,
};

export default rootReducer;
