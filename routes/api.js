'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.get('/api/convert', (req, res) => {
    try {
      let convertHandler = new ConvertHandler();
      const { input } = req.query;
      let errors = [];
      let initNum = convertHandler.getNum(input);
      if (initNum instanceof Error) {
        errors.push(initNum);
      }
      let initUnit = convertHandler.getUnit(input);
      if (initUnit instanceof Error) {
        errors.push(initUnit);
      }

      let returnUnit = convertHandler.getReturnUnit(initUnit);
      if (returnUnit instanceof Error) {
        errors.push(returnUnit);
      }
      if (errors.length) throw errors;
      let returnNum = convertHandler.convert(initNum, initUnit);
      // console.log("returnNum", returnNum)
      let spellInitUnit = convertHandler.spellOutUnit(initUnit);
      let spellReturnUnit = convertHandler.spellOutUnit(returnUnit);
      let string = convertHandler.getString(
        initNum,
        spellInitUnit,
        returnNum,
        spellReturnUnit
      );

      return res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string,
      });
    } catch (errs) {
      let str = 'invalid';
      // console.log(errs)

      if (errs.length) {
        // console.log(errs)
        errs.forEach((val, i) => {
          // console.log(val.message)
          if (i === 0) {
            str += ' ' + val.message;
          } else {
            str += ' and ' + val.message;
          }
        });
      }
      // console.log(str)
      return res.json(str);
    }
  });
};
