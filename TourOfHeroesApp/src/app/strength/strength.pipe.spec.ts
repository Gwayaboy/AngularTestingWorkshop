import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {

    it('should display (10 strong) when strength is 10 ', () => {
        // Arrange
        const pipe = new StrengthPipe();

        // Act
        const result = pipe.transform(10);

        // Assert
        expect(result).toEqual('10 (strong)');
    });
});
