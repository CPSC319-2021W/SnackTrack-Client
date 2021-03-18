import { handleSearch } from '../../helpers/SearchHelpers';

describe('Search Helpers', () => {
  const searchOptions = {
    keys: ['name']
  };

  const names = [
    { name: 'Lorenzo' },
    { name: 'Angelli' },
    { name: 'Hyesun' },
    { name: 'Justin' },
    { name: 'Hyunuk' },
    { name: 'Jessica' },
    { name: 'Howard' },
    { name: 'Ken' }
  ];

  let testResult;

  const setTestResult = (array) => {
    testResult = array[0];
  };

  test.each([
    ['', names, setTestResult, { name: 'Lorenzo' }],
    ['Lorenzo', names, setTestResult, { name: 'Lorenzo' }],
    ['Anjelli', names, setTestResult, { name: 'Angelli' }],
    ['  Howrd   ', names, setTestResult, { name: 'Howard' }],
    [
      '  Jess   ',
      names,
      (array) => {
        testResult = array[0];
        testResult.firstName = testResult.name;
        delete testResult.name;
      },
      { firstName: 'Jessica' }
    ]
  ])(
    'should test handleSearch: %s',
    (searchValue, arrayToSearch, func, expectedResult) => {
      // Act
      const actualResult = handleSearch(arrayToSearch, searchValue, func, searchOptions);

      // Assert
      expect(actualResult);
      expect(testResult).toMatchObject(expectedResult);
    }
  );

  test.each([
    ['', [], setTestResult],
    ['searching', [], setTestResult]
  ])(
    'should return undefined for handleSearch: empty array to search',
    (searchValue, arrayToSearch, func) => {
      // Act
      const actualResult = handleSearch(arrayToSearch, searchValue, func, searchOptions);

      // Assert
      expect(actualResult).toBeUndefined();
      expect(testResult).toBeUndefined();
    }
  );
});
