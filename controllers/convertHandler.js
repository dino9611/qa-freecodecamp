function ConvertHandler() {
  this.getNum = function (input) {
    let result = input.match(/[^a-zA-Z\s]/g);
    if (result === null) {
      return 1;
    }
    result = result.join('');
    if (!this.checkValidFraction(result)) {
      // return NaN
      // return NaN
      return new Error('number');
    }
    result = eval(result);
    // console.log("getnum :", result)
    return result;
  };

  this.getUnit = function (input) {
    let result = input.match(/[a-zA-Z]/g);
    if (result === null) {
      return new Error('unit');
    }
    result = result.join('');
    result = this.lowerCaseUnit(result);
    // console.log("getunit :", result)
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'L'.toLowerCase():
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        return new Error('unit');
    }
    // console.log("returnUnit :", result)

    return this.lowerCaseUnit(result);
  };

  this.checkValidFraction = function (numb) {
    let numbs = numb.split('/');
    if (numbs.length > 2) {
      return false;
    }
    return true;
  };

  this.spellOutUnit = function (unit) {
    // console.log(unit)
    let result;
    switch (unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L'.toLowerCase():
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        return new Error('unit not Found');
    }
    // console.log("spell :", result)

    return result;
  };

  this.calculate = function (numb, change, isDivide) {
    if (isDivide) {
      return numb / change;
    }
    return numb * change;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    // console.log(initNum, initUnit)
    // initNum = eval(initNum)
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = this.calculate(initNum, galToL, false);
        console.log(result);
        break;
      case 'L'.toLowerCase():
        result = this.calculate(initNum, galToL, true);
        break;
      case 'lbs':
        result = this.calculate(initNum, lbsToKg, false);
        break;
      case 'kg':
        result = this.calculate(initNum, lbsToKg, true);
        break;
      case 'mi':
        result = this.calculate(initNum, miToKm, false);
        break;
      case 'km':
        result = this.calculate(initNum, miToKm, true);
        break;
      default:
        return new Error('unit');
    }
    // console.log("convert : ", result)
    return parseFloat(result.toFixed(5));
  };

  this.lowerCaseUnit = function (str) {
    if (str.toLowerCase() !== 'l') {
      return str.toLowerCase();
    }
    return str.toUpperCase();
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.lowerCaseUnit(
      initUnit
    )} converts to ${returnNum} ${this.lowerCaseUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
