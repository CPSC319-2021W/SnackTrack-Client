const mockData =   {
  payments: [
    { paymentDate: '2020/01/21', paymentAmount: 500, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/21', paymentAmount: 500, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/21', paymentAmount: 500, processedBy: 'HyesunAn' },
    { paymentDate: '2020/01/12', paymentAmount: 1000, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/12', paymentAmount: 1000, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/12', paymentAmount: 1000, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/10', paymentAmount: 100, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/10', paymentAmount: 100, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/10', paymentAmount: 100, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/10', paymentAmount: 25, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/10', paymentAmount: 25, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/10', paymentAmount: 25, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' },
    { paymentDate: '2020/01/01', paymentAmount: 125, processedBy: 'JustinWong' }
  ]
};

const recordName = {
  // TODO: enter the record name the DB returns for the record type
  payments: 'payments'
};

// ASSUMES: page >=0, rowsPerPage > 0
const mockDBCall = (key, page, rowsPerPage) => {
  // Assign an empty array if the key is invalid
  const data = mockData[key] || [];
  const totalRows = data.length;
  const startRow = page * rowsPerPage;
  const recordTitle = recordName[key];

  const res = {
    totalRows: totalRows,
    totalPages: Math.ceil(totalRows/rowsPerPage)    
  };

  if (startRow < 0 || startRow >= totalRows) {
    console.log('The requested page does not exist.');
    res[recordTitle] = [];
    res.currentPage = 0;
  } else {
    const endRow = Math.min(totalRows, startRow + rowsPerPage);
    res[recordTitle] = data.slice(startRow, endRow);
    res.currentPage = page;
  }

  return res;
};

export { mockDBCall, mockData };
