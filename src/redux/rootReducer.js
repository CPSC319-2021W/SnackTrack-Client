import AuthReducer from './features/auth/authSlice';
import SearchbarReducer from './features/searchbar/searchbarSlice';
import SnacksReducer from './features/snacks/snacksSlice';
import UsersReducer from './features/users/usersSlice';

const rootReducer = {
  authReducer: AuthReducer,
  usersReducer: UsersReducer,
  snacksReducer: SnacksReducer,
  searchbarReducer: SearchbarReducer
};

export default rootReducer;
