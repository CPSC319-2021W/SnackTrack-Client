const toPaginatedSnacks = (snacks, page, rowsPerPage) => {
  const data = snacks || [];
  const totalRows = data.length;
  const startRow = page * rowsPerPage;

  const res = {
    total_rows: totalRows
  };

  if (startRow < 0 || startRow > totalRows) {
    throw new RangeError();
  }
  if (startRow === totalRows) {
    res.snacks = [];
    res.current_page = 0;
    res.total_pages = 1;
  } else {
    const endRow = Math.min(totalRows, startRow + rowsPerPage);
    res.snacks = data.slice(startRow, endRow);
    res.current_page = page;
    res.total_pages = Math.ceil(totalRows / rowsPerPage);
  }

  return res;
};

export { toPaginatedSnacks };
