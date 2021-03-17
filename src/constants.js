export const ROUTES = {
  LOGIN: '/login',
  SELECT: '/select-login',
  SNACKS: '/',
  TRANSACTIONS: '/transactions',
  ADMIN: '/admin',
  INVENTORY: '/admin/inventory',
  USERS: '/admin/users'
};

export const DEFAULT_CATEGORIES = {
  CHOCOLATE: 'Chocolate',
  CANDY: 'Candy',
  CHIPS: 'Chips',
  COOKIES: 'Cookies',
  CRACKERS: 'Crackers',
  FRUITS: 'Fruits'
};

export const CATEGORIES_LIST = [
  {
    id: 1,
    name: DEFAULT_CATEGORIES.CHOCOLATE,
    selected: false
  },
  {
    id: 2,
    name: DEFAULT_CATEGORIES.CANDY,
    selected: false
  },
  {
    id: 3,
    name: DEFAULT_CATEGORIES.CHIPS,
    selected: false
  },
  {
    id: 4,
    name: DEFAULT_CATEGORIES.COOKIES,
    selected: false
  },
  {
    id: 5,
    name: DEFAULT_CATEGORIES.CRACKERS,
    selected: false
  },
  {
    id: 6,
    name: DEFAULT_CATEGORIES.FRUITS,
    selected: false
  }
];

export const NOTIFICATIONS = {
  BATCH_SUCCESS: { type: 'success', message: 'New batch added' },
  BATCH_DELETE_SUCCESS: { type: 'success', message: 'Batch deleted' },
  ORDER_SUCCESS: { type: 'success', message: 'Snack tracked! Enjoy!' },
  PAYMENT_SUCCESS: { type: 'success', message: 'Payment submitted. Thank you!' },
  CHANGES_SUCCESS: { type: 'success', message: 'Your changes have been saved.' },
  CANCEL_SUCCESS: {
    type: 'success',
    message: 'Cancelled! Please remember to put the snacks back.'
  },
  SUGGESTION: {
    type: 'success',
    message: 'Suggestion sent by carrier pigeon. Keep your eyes out for new snacks!'
  },
  CLAIM_SUCCESS: {
    type: 'success',
    message: 'Thanks! Orders that were approved will appear in your transaction history.'
  },
  ERROR: {
    type: 'error',
    message: 'Uh-oh! Something went wrong. Please try again later.'
  },
  CLAIM_ERROR: {
    type: 'error',
    message: 'Please approve or decline pending orders before making new purchases.'
  }
};

export const TRANSACTION_TYPES = {
  PURCHASE: 1,
  CANCEL: 2,
  PENDING: 3
};

export const FIELD_ERROR_MESSAGES = {
  PRICE: 'Enter a valid price!',
  NAN: 'Gotta be a number!',
  EMPTY: "Can't be blank!"
};
