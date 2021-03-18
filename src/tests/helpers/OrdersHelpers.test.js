import {
  calculateOrdersSum,
  isCancelled,
  isPaid,
  isPaymentPending
} from '../../helpers/OrdersHelpers';

describe('Orders Helpers', () => {
  test.each([
    [null, false],
    [1, true],
    [10, true]
  ])('should test isPaid: %i returns %i', (paymentId, expectedResult) => {
    // Act
    const actualResult = isPaid(paymentId);

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });

  test.each([
    [1, false],
    [2, true],
    [3, false],
    [4, false]
  ])('should test isCancelled: %i returns %i', (transactionTypeId, expectedResult) => {
    // Act
    const actualResult = isCancelled(transactionTypeId);

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });

  test.each([
    [null, 1, true],
    [null, 2, false],
    [null, 3, false],
    [null, 4, false],
    [10, 1, false],
    [10, 2, false],
    [10, 3, false],
    [10, 4, false]
  ])(
    'should test isPaymentPending: %i returns %i',
    (paymentId, transactionTypeId, expectedResult) => {
      // Act
      const actualResult = isPaymentPending(paymentId, transactionTypeId);

      // Assert
      expect(actualResult).toEqual(expectedResult);
    }
  );

  test.each([
    [
      [{ transaction_amount: 10 }, { transaction_amount: 0 }, { transaction_amount: 10 }],
      20
    ],
    [
      [{ transaction_amount: 0 }, { transaction_amount: 0 }, { transaction_amount: 0 }],
      0
    ],
    [
      [{ transaction_amount: 5 }, { transaction_amount: 5 }, { transaction_amount: 5 }],
      15
    ],
    [[], 0]
  ])('should test calculateOrdersSum', (orders, expectedSum) => {
    // Act
    const actualSum = calculateOrdersSum(orders);

    // Assert
    expect(actualSum).toEqual(expectedSum);
  });
});
