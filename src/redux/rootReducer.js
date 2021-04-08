import AuthReducer from './features/auth/authSlice';
import NotificationsReducer from './features/notifications/notificationsSlice';
import SearchbarReducer from './features/searchbar/searchbarSlice';
import ShoppingListReducer from './features/shoppingList/shoppingListSlice';
import SnacksReducer from './features/snacks/snacksSlice';
import TransactionsReducer from './features/transactions/transactionsSlice';
import UsersReducer from './features/users/usersSlice';

const rootReducer = {
  authReducer: AuthReducer,
  notificationsReducer: NotificationsReducer,
  searchbarReducer: SearchbarReducer,
  shoppingListReducer: ShoppingListReducer,
  snacksReducer: SnacksReducer,
  transactionsReducer: TransactionsReducer,
  usersReducer: UsersReducer
};

export default rootReducer;
