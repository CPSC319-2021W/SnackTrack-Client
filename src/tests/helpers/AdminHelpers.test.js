import { toPaginatedSnacks } from '../../helpers/AdminHelpers';

describe('Admin Helpers', () => {
  const snacks = [
    { snack_name: 'snackOne' },
    { snack_name: 'snackTwo' },
    { snack_name: 'snackThree' }
  ];

  it('should throw error if page exceeds snacks', () => {
    // Setup
    const rowsPerPage = 1;
    const page = 2;

    try {
      // Act
      const paginatedSnacks = toPaginatedSnacks(snacks, page, rowsPerPage);
    } catch (err) {
      // Assert
      expect(err).toBe(RangeError);
    }
  });

  it('should paginate empty snacks to 0 rows on page 0', () => {
    // Setup
    const rowsPerPage = 8;
    const page = 0;
    const expectedPagination = {
      total_rows: 0,
      snacks: [],
      total_pages: 1,
      current_page: 0
    };

    // Act
    const paginatedSnacks = toPaginatedSnacks([], page, rowsPerPage);

    // Assert
    expect(paginatedSnacks).toEqual(expectedPagination);
  });

  test.each([
    [8, 0, snacks],
    [10, 0, snacks],
    [2, 0, snacks],
    [2, 1, snacks]
  ])('should paginate snacks to %i rows on page %i', (rowsPerPage, page, snacks) => {
    // Setup
    const start = page * rowsPerPage;
    const end = Math.min(snacks.length, start + rowsPerPage);
    const expectedPagination = {
      total_rows: snacks.length,
      snacks: snacks.slice(start, end),
      total_pages: Math.ceil(snacks.length / rowsPerPage),
      current_page: page
    };

    // Act
    const paginatedSnacks = toPaginatedSnacks(snacks, page, rowsPerPage);

    // Assert
    expect(paginatedSnacks).toEqual(expectedPagination);
  });
});
