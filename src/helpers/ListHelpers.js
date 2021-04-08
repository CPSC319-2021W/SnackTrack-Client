import { DEFAULT_ORDER_THRESHOLD } from '../constants';

const sortSnackInventory = (snacks) => {
  return snacks.sort((a, b) => {
    const quantityA = a.quantity;
    const reorderPointA = a.order_threshold || DEFAULT_ORDER_THRESHOLD;
    const quantityLessReorderA = quantityA - reorderPointA;
    const expiredA = a.expired_quantity;
    
    const quantityB = b.quantity;
    const reorderPointB = b.order_threshold || DEFAULT_ORDER_THRESHOLD;
    const quantityLessReorderB = quantityB - reorderPointB;
    const expiredB = b.expired_quantity;

    // both out of stock
    if (quantityA === 0 && quantityB === 0) {
      return 0;
    // a out of stock
    } else if (quantityA === 0) {
      return -1;
    // b out of stock
    } else if (quantityB === 0) {
      return 1;
    // both with expired stock
    } else if (expiredA > 0 && expiredB > 0) {
      // both with all expired stock
      if (quantityA - expiredA === 0 && quantityB - expiredB === 0) {
        // a with less stock than b
        if (quantityLessReorderA < quantityLessReorderB) {
          return -1;
        // b with less stock than a
        } else if (quantityLessReorderA > quantityLessReorderB) {
          return 1;
        // a with equal stock to b
        } else {
          return 0;
        }
      // a with all expired stock, b with some expired stock
      } else if (quantityA - expiredA === 0 && quantityB - expiredB > 0) {
        return -1;
      // a with some expired stock, b with all expired stock
      } else if (quantityA - expiredA > 0 && quantityB - expiredB === 0) {
        return 1;
      // a and b with some expired stock
      } else {
        // should this ordered by quantity of fresh stock first? then quantity less reorder point?
        // a with less stock over reorder than b
        if (quantityLessReorderA < quantityLessReorderB) {
          return -1;
        // b with less stock over reorder than a
        } else if (quantityLessReorderA > quantityLessReorderB) {
          return 1;
        // a with equal stock to b
        } else {
          if (quantityA - expiredA < quantityB - expiredB) {
            return -1;
          } else if (quantityA - expiredA > quantityB - expiredB) {
            return 1;
          } else {
            return 0;
          }
          // return 0;
        }
      }
    } else if (expiredA > 0) {
      return -1;
    } else if (expiredB > 0) {
      return 1;
    } else if (quantityLessReorderA < 0 && quantityLessReorderB < 0) {
      if (quantityA < quantityB) {
        return -1;
      } else if (quantityA > quantityB) {
        return 1;
      } else {
        return 0;
      }
    } else if (quantityLessReorderA < quantityLessReorderB) {
      return -1;
    } else if (quantityLessReorderA > quantityLessReorderB) {
      return 1;
    } else {
      return 0;
    }
  });
};

export { sortSnackInventory };
