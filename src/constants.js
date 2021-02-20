export const DEFAULT_CATEGORIES = {
  CHOCOLATE: 'Chocolate',
  CANDY: 'Candy',
  COOKIES: 'Cookies',
  CRACKERS: 'Crackers',
  CHIPS: 'Chips',
  FRUITS: 'Fruits'
};

export const CATEGORIES_LIST = [
  {
    name: DEFAULT_CATEGORIES.CHOCOLATE,
    selected: false
  },
  {
    name: DEFAULT_CATEGORIES.CANDY,
    selected: false
  },
  {
    name: DEFAULT_CATEGORIES.COOKIES,
    selected: false
  },
  {
    name: DEFAULT_CATEGORIES.CRACKERS,
    selected: false
  },
  {
    name: DEFAULT_CATEGORIES.CHIPS,
    selected: false
  },
  {
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
