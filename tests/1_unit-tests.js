const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input', function () {
    let input = '3gal';
    let expectedOutput = 3;

    let output = convertHandler.getNum(input);

    assert.equal(output, expectedOutput);
  });
  test('should correctly read a  decimal number input', function () {
    let input = '3.1gal';
    let expectedOutput = 3.1;

    let output = convertHandler.getNum(input);

    assert.equal(output, expectedOutput);
  });

  test('should correctly read a fractional input', function () {
    let input = '3/2gal';
    let expectedOutput = 1.5;

    let output = convertHandler.getNum(input);

    assert.equal(output, expectedOutput);
  });

  test('should correctly read a fractional input with a decimal', function () {
    let input = '1.5/2gal';
    let expectedOutput = 0.75;

    let output = convertHandler.getNum(input);

    assert.equal(output, expectedOutput);
  });

  test('should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    let input = '3/2/3gal';

    let output = convertHandler.getNum(input);
    // console.log(output)
    assert.instanceOf(output, Error);
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    let input = 'kg';
    let expectedOutput = 1;

    let output = convertHandler.getNum(input);

    assert.equal(output, expectedOutput);
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    let input = '';
    let expectedOutput = 1;

    let output = convertHandler.getNum(input);

    assert.equal(output, expectedOutput);
  });

  suite('should return correct unit for Input unit', function () {
    test('should correctly read each valid input unit', function () {
      let input = '10kg';
      let expectedOutput = 'kg';

      let output = convertHandler.getUnit(input);

      assert.equal(output, expectedOutput);
    });
    test('should correctly return an error for an invalid input unit', function () {
      let input = '';
      // let expectedOutput = "kg"

      let output = convertHandler.getUnit(input);

      assert.instanceOf(output, Error);
    });
  });
  suite(
    'should return the correct return unit for each valid input unit',
    function () {
      test('should correctly convert gal to L', function () {
        let input = 'gal';
        let expectedOutput = 'L';

        let output = convertHandler.getReturnUnit(input);

        assert.equal(output, expectedOutput);
      });
      test('should correctly convert L to gal', function () {
        let input = 'L';
        let expectedOutput = 'gal';

        let output = convertHandler.getReturnUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should correctly convert lbs to kg', function () {
        let input = 'lbs';
        let expectedOutput = 'kg';

        let output = convertHandler.getReturnUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should correctly convert kg to lbs', function () {
        let input = 'kg';
        let expectedOutput = 'lbs';

        let output = convertHandler.getReturnUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should correctly convert mi to km', function () {
        let input = 'mi';
        let expectedOutput = 'km';

        let output = convertHandler.getReturnUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should correctly convert km to mi', function () {
        let input = 'km';
        let expectedOutput = 'mi';

        let output = convertHandler.getReturnUnit(input);

        assert.equal(output, expectedOutput);
      });
    }
  );
  suite(
    'should correctly return the spelled-out string unit for each valid input unit',
    function () {
      test('should return kilograms for kg unit', function () {
        let input = 'kg';
        let expectedOutput = 'kilograms';

        let output = convertHandler.spellOutUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should return liters for L unit', function () {
        let input = 'L';
        let expectedOutput = 'liters';

        let output = convertHandler.spellOutUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should return pounds for lbs unit', function () {
        let input = 'lbs';
        let expectedOutput = 'pounds';

        let output = convertHandler.spellOutUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should return miles for mi unit', function () {
        let input = 'mi';
        let expectedOutput = 'miles';

        let output = convertHandler.spellOutUnit(input);

        assert.equal(output, expectedOutput);
      });

      test('should return kilometers for km unit', function () {
        let input = 'km';
        let expectedOutput = 'kilometers';

        let output = convertHandler.spellOutUnit(input);

        assert.equal(output, expectedOutput);
      });
    }
  );
});
