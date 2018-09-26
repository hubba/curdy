require('./../../../helpers');

const SimpleModel = require('./../../../models/simpleModel.model');
const show = require('./../../../../lib/show');
const utilities = require('./../../../../lib/utilities');

describe('curdy.show.operation', () => {
  describe('simple models', () => {
    beforeEach(() => {
      this.show = show.operation.method(
        SimpleModel,
        'simpleModel',
        {
          string: 'body.string',
          number: 'params.number',
          boolean: 'otherRequestObjects.boolean'
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

    it('must show a simple model (and do nothing)', () => {
      const req = {
        simpleModel: this.simpleModel
      };

      return this.show(req, null, utilities.when);
    });
  });
});