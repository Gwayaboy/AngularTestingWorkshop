import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {

  const parameters = [
    { strength: 1, expectedResult: '1 (weak)'},
    { strength: 10, expectedResult: '10 (strong)'},
    { strength: 100, expectedResult: '100 (unbelievable)'},
  ];

  parameters.forEach((param) => {
    it(`should display "${param.expectedResult}" when strength is ${param.strength}` , () => {
      // Arrange
      const pipe = new StrengthPipe();
      // Act
      const result = pipe.transform(param.strength);
      // Assert
      expect(result).toEqual(param.expectedResult);
    });
  });
});
