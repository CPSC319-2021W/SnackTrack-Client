describe('Auth Helpers', () => {
  test.each([[true], [false]])('should test isAdmin', (expectedResult) => {
    // Setup
    const isAdmin = jest.fn(() => expectedResult);

    // Act
    const token = isAdmin();

    // Assert
    expect(token).toBe(expectedResult);
  });

  test.each([[true], [false]])('should test isAuthenticated', (expectedResult) => {
    // Setup
    const isAuthenticated = jest.fn(() => expectedResult);

    // Act
    const token = isAuthenticated();

    // Assert
    expect(token).toBe(expectedResult);
  });

  test.each([
    [
      {
        userId: 1,
        firstName: 'test',
        lastName: 'test',
        emailAddress: 'test@test.com',
        imageUri: 'http://testUri.com',
        balance: 0,
        isAdmin: true
      },
      false
    ],
    [
      {
        userId: 1,
        firstName: 'test',
        lastName: 'test',
        emailAddress: 'test@test.com',
        isAdmin: false
      },
      false
    ],

    [
      {
        userId: 1
      },
      false
    ],
    [
      {
        userId: 1,
        firstName: 'test',
        lastName: 'test'
      },
      true
    ]
  ])('should test isCommonLogin', (profile, expectedResult) => {
    // Setup
    const isCommonLogin = jest.fn(() => expectedResult);

    // Act
    const actualResult = isCommonLogin(profile);

    // Assert
    expect(actualResult).toBe(expectedResult);
  });
});
