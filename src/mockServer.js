const mockPaymentData = [
  {
    payments: [
      { paymentDate: '2020/01/21', paymentAmount: 500, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/21', paymentAmount: 500, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/21', paymentAmount: 500, processedBy: 'HyesunAn' },
      { paymentDate: '2020/01/12', paymentAmount: 1000, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/12', paymentAmount: 1000, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/12', paymentAmount: 1000, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/10', paymentAmount: 100, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/10', paymentAmount: 100, processedBy: 'JustinWong' }
    ],
    totalRows: 18,
    totalPages: 3,
    currentPage: 0
  },
  {
    payments: [
      { paymentDate: '2020/01/10', paymentAmount: 100, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/10', paymentAmount: 25, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/10', paymentAmount: 25, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/10', paymentAmount: 25, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' }
    ],
    totalRows: 18,
    totalPages: 3,
    currentPage: 1
  },
  {
    payments: [
      { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
      { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' }
    ],
    totalRows: 18,
    totalPages: 3,
    currentPage: 2
  }
];

const mockTransactionData = [
  {
    transactions: [
      {
        transaction_id: 1,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: null,
        status: 'PR'
      },
      {
        transaction_id: 2,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: null,
        status: 'PR'
      },
      {
        transaction_id: 3,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: null,
        status: 'PR'
      },
      {
        transaction_id: 4,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: null,
        status: 'CN'
      },
      {
        transaction_id: 5,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: 1,
        status: 'PR'
      },
      {
        transaction_id: 6,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: null,
        status: 'CN'
      },
      {
        transaction_id: 7,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: 1,
        status: 'PR'
      },
      {
        transaction_id: 8,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: 1,
        status: 'PR'
      }
    ],
    totalRows: 10,
    totalPages: 2,
    currentPage: 0
  },
  {
    transactions: [
      {
        transaction_id: 9,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: 1,
        status: 'PR'
      },
      {
        transaction_id: 10,
        snack_name: 'Banana',
        transaction_amount: 300,
        quantity: 12,
        transaction_dtm: '2020/01/21',
        user_id: 1,
        payment_id: null,
        status: 'PR'
      }
    ],
    totalRows: 10,
    totalPages: 2,
    currentPage: 1
  }
];

const mockPaymentDBCall = (page, rowsPerPage) => {
  rowsPerPage + 0; // This line is to satisfy es-lint, it will be passed to axios
  return mockPaymentData[page];
};

const mockTransactionDBCall = (page, rowsPerPage) => {
  rowsPerPage + 0; // This line is to satisfy es-lint, it will be passed to axios
  return mockTransactionData[page];
};

export { mockPaymentDBCall, mockTransactionDBCall };
