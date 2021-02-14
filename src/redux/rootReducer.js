import AuthReducer from './features/auth/authSlice';
import SnackFilterReducer from './features/snackFilterSlice';

const rootReducer = {
	authReducer: AuthReducer,
	snackFilterReducer: SnackFilterReducer,
};

export default rootReducer;
