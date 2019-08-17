"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var strength_pipe_1 = require("./strength.pipe");
describe('StrengthPipe', function () {
    it('should display string when strenght is 10 ', function () {
        // Arrange
        var pipe = new strength_pipe_1.StrengthPipe();
        // Act
        var result = pipe.transform(10);
        // Assert
        expect(result).toEqual('10 (strong)');
    });
});
//# sourceMappingURL=strength.pipe.spec.js.map