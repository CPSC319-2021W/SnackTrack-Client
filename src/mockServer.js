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
        orderDate: '2020/01/21',
        snack: 'Banana',
        quantity: 12,
        status: 'PR',
        total: 300,
        actions: ''
      },
      {
        orderDate: '2020/01/21',
        snack: 'Banana',
        quantity: 12,
        status: 'PR',
        total: 300,
        actions: ''
      },
      {
        orderDate: '2020/01/21',
        snack: 'Banana',
        quantity: 12,
        status: 'PR',
        total: 300,
        actions: ''
      },
      {
        orderDate: '2020/01/12',
        snack: 'Banana',
        quantity: 12,
        status: 'CN',
        total: 300,
        actions: ''
      },
      {
        orderDate: '2020/01/12',
        snack: 'Banana',
        quantity: 1,
        paymentId: 1,
        status: 'PR',
        total: 1000,
        actions: ''
      },
      {
        orderDate: '2020/01/12',
        snack: 'KitKat',
        quantity: 1,
        paymentId: 1,
        status: 'PR',
        total: 25,
        actions: ''
      },
      {
        orderDate: '2020/01/10',
        snack: 'KitKat',
        quantity: 1,
        paymentId: 1,
        status: 'PR',
        total: 125,
        actions: ''
      },
      {
        orderDate: '2020/01/10',
        snack: 'KitKat',
        quantity: 1,
        paymentId: 1,
        status: 'PR',
        total: 100,
        actions: ''
      }
    ],
    totalRows: 10,
    totalPages: 2,
    currentPage: 0
  },
  {
    transactions: [
      {
        orderDate: '2020/01/01',
        snack: 'KitKat',
        quantity: 1,
        paymentId: 1,
        status: 'PR',
        total: 125,

        actions: ''
      },
      {
        orderDate: '2020/01/01',
        snack: 'KitKat',
        quantity: 1,
        paymentId: 1,
        status: 'PR',
        total: 125,

        actions: ''
      }
    ],
    totalRows: 10,
    totalPages: 2,
    currentPage: 1
  },
  {
    transactions: [],
    totalRows: 0,
    totalPages: 1,
    currentPage: 0
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
