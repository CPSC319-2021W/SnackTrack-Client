const mockData = [
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

const mockDBCall = (page, rowsPerPage) => {
  rowsPerPage + 0; // This line is to satisfy es-lint, it will be passed to axios
  return mockData[page];
};

export { mockDBCall, mockData };
