require('./../../../helpers');

const chai = require('chai');
const expect = chai.expect;

const SimpleModel = require('./../../../models/simpleModel.model');
const update = require('./../../../../lib/update');
const utilities = require('./../../../../lib/utilities');

describe('curdy.update.find', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.update = update.find.method(
        SimpleModel,
        'simpleModel',
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
      });
    });

    it('must find', () => {
      const req = {
        params: {
          _id: this.simpleModel._id.toString()
        }
      };

      return this.update(req, null, utilities.when)
      .then(() => {
        expect(req.simpleModel._id.toString()).to.equal(this.simpleModel._id.toString());
        expect(req.simpleModel.string).to.equal(this.simpleModel.string);
        expect(req.simpleModel.number).to.equal(this.simpleModel.number);
        expect(req.simpleModel.boolean).to.equal(this.simpleModel.boolean);
      });
    });
  });
});