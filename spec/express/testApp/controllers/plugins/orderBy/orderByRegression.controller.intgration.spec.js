const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const OrderedModel = require('./../../../../testApp/controllers/plugins/orderBy/orderedModel.model');
const expressIntegrationHelper = require('./../../../express.integrationHelper');

const BASE_URI = '/plugins/orderBy/regression';

describe('orderByRegression.controller.integration.spec', () => {
  beforeEach(() => {
    expressIntegrationHelper.beforeEach(this);


    return OrderedModel.create({
      name: 'name',
    })
    .then((orderedModel) => {
      this.orderedModel = orderedModel;
    });
  });

  describe('create', () => {
    it('must create a OrderedModel', () => {
      return request(this.app)
      .post(`${BASE_URI}`)
      .send({
        name: 'not name',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.orderedModel.name).to.equal('not name');

        return OrderedModel.findById(body.orderedModel._id);
      })
      .then((orderedModel) => {
        expect(orderedModel.name).to.equal('not name');
      });
    });
  });

  describe('delete', () => {
    it('must delete a OrderedModel', () => {
      return request(this.app)
      .delete(`${BASE_URI}/${this.orderedModel._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.orderedModel.success).to.equal(true);

        return OrderedModel.count({ _id: this.orderedModel._id });
      })
      .then((orderedModelCount) => {
        expect(orderedModelCount).to.equal(0);
      });
    });
  });

  describe('show', () => {
    it('must render a OrderedModel', () => {
      return request(this.app)
      .get(`${BASE_URI}/${this.orderedModel._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.string).to.equal(this.orderedModel.string);
        expect(body.number).to.equal(this.orderedModel.number);
        expect(body.boolean).to.equal(this.orderedModel.boolean);
      });
    });
  });

  describe('showAll', () => {
    beforeEach(() => {
      return OrderedModel.remove({})
      .then(() => {
        return Promise.all([
          OrderedModel.create({
            name: 'name'
          }),
          OrderedModel.create({
            name: 'not name'
          }),
          OrderedModel.create({
            name: 'not not name'
          }),
          OrderedModel.create({
            name: 'not not not name'
          })
        ]);
      })
      .then((orderedModels) => {
        this.orderedModels = orderedModels;
      });
    });

    it('must render a OrderedModel', () => {
      return request(this.app)
      .get(`${BASE_URI}/`)
      .expect(200)
      .then(({ body }) => {
        expect(body.orderedModels.length).to.equal(this.orderedModels.length);
        this.orderedModels.forEach((orderedModel) => {
          expect(body.orderedModels).to.deep.contain({
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          });
        });
      });
    });
  });

  describe('update', () => {
    it('must create a OrderedModel', () => {
      return request(this.app)
      .put(`${BASE_URI}/${this.orderedModel._id}`)
      .send({
        name: 'not name',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.orderedModel._id).to.equal(this.orderedModel._id.toString());
        expect(body.orderedModel.name).to.equal('not name');

        return OrderedModel.findById(body.orderedModel._id);
      })
      .then((orderedModel) => {
        expect(orderedModel.name).to.equal('not name');
      });
    });
  });
});