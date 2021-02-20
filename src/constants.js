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
  ORDER_SUCCESS: { type: 'success', message: 'Snack tracked! Enjoy!' },
  PAYMENT_SUCCESS: { type: 'success', message: 'Payment submitted. Thank you!' },
  SUGGESTION: {
    type: 'success',
    message: 'Suggestion sent by carrier pigeon. Keep your eyes out for new snacks!'
  },
  SAVE_PROFILE_SUCCESS: {
    type: 'success',
    message: 'Changes to your user profile is saved.'
  },
  ERROR: {
    type: 'error',
    message: 'Uh-oh! Something went wrong. Please try again later.'
  }
};
