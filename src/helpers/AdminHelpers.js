const toPaginatedSnacks = (snacks, page, rowsPerPage) => {
  const data = snacks || [];
  const totalRows = data.length;
  const startRow = page * rowsPerPage;

  const res = {
    total_rows: totalRows,
    total_pages: Math.ceil(totalRows / rowsPerPage)
  };

  if (startRow < 0 || startRow >= totalRows) {
    res.snacks = [];
    res.current_page = 0;
  } else {
    const endRow = Math.min(totalRows, startRow + rowsPerPage);
    res.snacks = data.slice(startRow, endRow);
    res.current_page = page;
  }

  return res;
};

export { toPaginatedSnacks };
