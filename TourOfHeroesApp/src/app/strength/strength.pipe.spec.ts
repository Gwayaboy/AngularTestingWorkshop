import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  const testCases = [
    { strength: 1, expectedResult: '1 (weak)'},
    { strength: 10, expectedResult: '10 (strong)'},
    { strength: 100, expectedResult: '100 (unbelievable)'},
  ];

  testCases.forEach(({strength, expectedResult}) => {
    it(`should display "${expectedResult}" when strength is ${strength}` , () => {
      // Arrange
      const pipe = new StrengthPipe();
      // Act
      const result = pipe.transform(strength);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
