/**
 * Basic structure of a jasmine test
 * **/
describe('A suite is just a function', () => {
	let sut;
	
	//'and so is beforeach function which gets called before each it block
	beforeEach(() => {
		sut = { };
	});

	it('And so is a spec which acts as your test method', () => {

       // Arrange
        sut.property = false;
	    // Act

       sut.property = true;
	     
       // Assert
		expect(sut.property).toBe(true);
	});

	//teardown after each it block
	afterEach(() => {
		sut.property = false;
	});
});
