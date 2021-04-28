import candyPlaceholder from './assets/placeholders/candy.png';
import chipsPlaceholder from './assets/placeholders/chips.png';
import chocolatePlaceholder from './assets/placeholders/chocolate.png';
import cookiesPlaceholder from './assets/placeholders/cookies.png';
import crackersPlaceholder from './assets/placeholders/crackers.png';
import fruitsPlaceholder from './assets/placeholders/fruits.png';
import otherPlaceholder from './assets/placeholders/other.png';

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

export const DEFAULT_SEARCH_THRESHOLD = 0.25;

export const CATEGORIES_LIST = [
  {
    id: 1,
    name: DEFAULT_CATEGORIES.CHOCOLATE,
    defaultImage: chocolatePlaceholder
  },
  {
    id: 2,
    name: DEFAULT_CATEGORIES.CANDY,
    defaultImage: candyPlaceholder
  },
  {
    id: 3,
    name: DEFAULT_CATEGORIES.CHIPS,
    defaultImage: chipsPlaceholder
  },
  {
    id: 4,
    name: DEFAULT_CATEGORIES.COOKIES,
    defaultImage: cookiesPlaceholder
  },
  {
    id: 5,
    name: DEFAULT_CATEGORIES.CRACKERS,
    defaultImage: crackersPlaceholder
  },
  {
    id: 6,
    name: DEFAULT_CATEGORIES.FRUITS,
    defaultImage: fruitsPlaceholder
  },
  {
    id: 7,
    name: DEFAULT_CATEGORIES.OTHER,
    defaultImage: otherPlaceholder
  }
];

export const GENERIC_ERROR = 'Oops. Well this is embarrassing.';

export const COMMON_PAGE_ERROR = 
  'Looks like you tried accessing the common page without signing out of your account first.';

export const INFO_LABELS = {
  REORDER_POINT:
    'Snack is labelled Low Stock if its inventory level falls below this point',
  ACTIVE_SNACK: 'Snack is hidden from Employee Module when toggled off'
};

export const NOTIFICATIONS = {
  BATCH_SUCCESS: { type: 'success', message: 'New batch added!' },
  BATCH_DELETE_SUCCESS: { type: 'success', message: 'Batch successfully deleted.' },
  ORDER_SUCCESS: { type: 'success', message: 'Snack tracked! Enjoy!' },
  PAYMENT_SUCCESS: { type: 'success', message: 'Payment submitted. Thank you!' },
  CHANGES_SUCCESS: { type: 'success', message: 'Your changes have been saved.' },
  CANCEL_SUCCESS: {
    type: 'success',
    message: 'Cancelled! Please remember to put the snacks back.'
  },
  SUGGESTION_SUCCESS: {
    type: 'success',
    message: 'Suggestion sent by carrier pigeon. Keep an eye out for new snacks!'
  },
  SUGGESTIONS_CLEAR_SUCCESS: {
    type: 'success',
    message: 'The carrier pigeons have returned home! All suggestions have been cleared.'
  },
  CLAIM_SUCCESS: {
    type: 'success',
    message: 'Thanks! Orders that were claimed will appear in your transactions.'
  },
  ERROR: {
    type: 'error',
    message: 'Uh-oh! Something went wrong. Please try again later.'
  },
  CLAIM_ERROR: {
    type: 'error',
    message: 'Please claim or decline pending orders before grabbing more snacks.'
  },
  USER_DELETE_SUCCESS: {
    type: 'success',
    message: 'User successfully deleted.'
  },
  PENDING_ORDERS_ERROR: {
    type: 'error',
    message:
      'There was an issue with your pending orders. We might bother you about them another time.'
  },
  ADMIN_PROMOTION_SUCCESS: {
    type: 'success',
    message: 'You have successfully promoted this user to Admin.'
  },
  ADMIN_DEMOTION_SUCCESS: {
    type: 'success',
    message: "You have revoked this user's Admin role."
  },
  SNACK_SUCCESS: { type: 'success', message: 'New snack added!' },
  SNACK_DELETE_SUCCESS: { type: 'success', message: 'Snack successfully deleted.' },
  INCORRECT_FILE_TYPE: {
    type: 'error',
    message: 'Please upload an appropriate image file format: JPEG, PNG, GIF.'
  }
};

export const TRANSACTION_TYPES = {
  PURCHASE: 1,
  CANCEL: 2,
  PENDING: 3
};

export const FIELD_ERROR_MESSAGES = {
  PRICE: 'Gotta be a valid price!',
  NAN: 'Gotta be a number!',
  NAI: 'Gotta be an integer!',
  UNDER_ONE: 'Gotta be more!',
  OVER_SIX: 'Gotta be less!',
  EMPTY: "Can't be blank!",
  DATE_FORMAT: 'Gotta be a valid date!',
  DATE_RANGE: "Can't be before today!"
};

export const GREETING = {
  MORNING: 'Good morning, ',
  AFTERNOON: 'Good afternoon, ',
  EVENING: 'Good evening, '
};

export const DEFAULT_ORDER_THRESHOLD = 10;

export const TOP_SNACK_REQUEST = {
  START_DATE: '2021-01-01',
  TRANSACTION_TYPE_ID: TRANSACTION_TYPES.PURCHASE,
  LIMIT: 5
};

export const TOP_SNACK_LENGTH = 13;

export const DEFAULT_TOP_SNACK_RANGE = [
  {
    id: 1,
    name: 'All Time'
  }, 
  {
    id: 2,
    name: 'Past 7 Days'
  }, 
  {
    id: 3,
    name: 'Past 30 Days'
  }, 
  {
    id: 4,
    name: 'Past 180 Days'
  }
];
