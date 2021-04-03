export const ROUTES = {
  LOGIN: '/login',
  COMMON: '/common',
  SNACKS: '/',
  TRANSACTIONS: '/transactions',
  DASHBOARD: '/admin',
  INVENTORY: '/admin/inventory',
  USERS: '/admin/users'
};

export const DEFAULT_CATEGORIES = {
  CHOCOLATE: 'Chocolate',
  CANDY: 'Candy',
  CHIPS: 'Chips',
  COOKIES: 'Cookies',
  CRACKERS: 'Crackers',
  FRUITS: 'Fruits',
  OTHER: 'Other'
};

export const CATEGORIES_LIST = [
  {
    id: 1,
    name: DEFAULT_CATEGORIES.CHOCOLATE
  },
  {
    id: 2,
    name: DEFAULT_CATEGORIES.CANDY
  },
  {
    id: 3,
    name: DEFAULT_CATEGORIES.CHIPS
  },
  {
    id: 4,
    name: DEFAULT_CATEGORIES.COOKIES
  },
  {
    id: 5,
    name: DEFAULT_CATEGORIES.CRACKERS
  },
  {
    id: 6,
    name: DEFAULT_CATEGORIES.FRUITS
  },
  {
    id: 7,
    name: DEFAULT_CATEGORIES.OTHER
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

export const GREETING = {
  MORNING: 'Good morning, ',
  AFTERNOON: 'Good afternoon, ',
  EVENING: 'Good evening, '
};