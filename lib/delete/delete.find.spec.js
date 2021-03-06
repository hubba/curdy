require('./../../spec/helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('../../spec/models/simpleModel.model');
const _delete = require('.');
const utilities = require('../utilities');

describe('curdy.delete.find', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.delete = _delete.find.method(
        SimpleModel,
        'curdy.simpleModel',
        {
          _id: 'params._id'
        }
      );

      return SimpleModel.create({
        string: 'string',
        number: 42,
        date: Date.now(),
        boolean: true
      })
      .then((simpleModel) => {
        this.simpleModel = simpleModel;
        this.res = {
          json: utilities.when
        };
      });
    });

    it('must find', () => {
      const req = {
        params: {
          _id: this.simpleModel._id.toString()
        }
      };

      return this.delete(req, this.res)
      .then(() => {
        expect(req.curdy.simpleModel._id.toString()).to.equal(this.simpleModel._id.toString());
      });
    });
  });
});