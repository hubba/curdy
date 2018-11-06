const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const PaginationModel = require('./../../../../testApp/controllers/plugins/pagination/paginationModel.model');
const expressIntegrationHelper = require('./../../../express.integrationHelper');

const BASE_URI = '/plugins/pagination/';

describe('orderByAscending.controller.integration.spec', () => {
  beforeEach(() => {
    const date = new Date();
    expressIntegrationHelper.beforeEach(this);


    return PaginationModel.remove({})
    .then(() => {
      return Promise.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].map((index) => {
        return PaginationModel.create({
          name: `name ${index}`,
          createdAt: date.setSeconds(date.getSeconds() - index)
        });
      }));
    })
    .then((paginationModels) => {
      this.paginationModels = paginationModels.sort((firstModel, secondModel) => {
        return firstModel.createdAt.getTime() - secondModel.createdAt.getTime();
      });
    });
  });

  describe('showAll', () => {
    it('must render the first 20 PaginationModels in ascending order', () => {
      return request(this.app)
      .get(`${BASE_URI}/`)
      .expect(200)
      .then(({ body }) => {
        expect(body.paginationModels.length).to.equal(20);
        expect(body.paginationModels).to.deep.equal(this.paginationModels.slice(0, 20).map((orderedModel) => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    it('must let the user set the skip', () => {
      return request(this.app)
      .get(`${BASE_URI}/?skip=2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.paginationModels.length).to.equal(20);
        expect(body.paginationModels).to.deep.equal(this.paginationModels.slice(2, 22).map((orderedModel) => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    it('must let the user set the limit', () => {
      return request(this.app)
      .get(`${BASE_URI}/?limit=2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.paginationModels.length).to.equal(2);
        expect(body.paginationModels).to.deep.equal(this.paginationModels.slice(0, 2).map((orderedModel) => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    it('must let the user set the limit', () => {
      return request(this.app)
      .get(`${BASE_URI}/?limit=2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.paginationModels.length).to.equal(2);
        expect(body.paginationModels).to.deep.equal(this.paginationModels.slice(0, 2).map((orderedModel) => {
          return {
            _id: orderedModel._id.toString(),
            name: orderedModel.name,
            createdAt: orderedModel.createdAt.toISOString(),
            updatedAt: orderedModel.updatedAt.toISOString(),
          };
        }));
      });
    });

    describe('sort', () => {
      it('must allow the user to sort createdAt asc', () => {
        return request(this.app)
        .get(`${BASE_URI}/?sort=createdAt:asc`)
        .expect(200)
        .then(({ body }) => {
          expect(body.paginationModels.length).to.equal(20);
          expect(body.paginationModels).to.deep.equal(this.paginationModels.slice(0, 20).map((orderedModel) => {
            return {
              _id: orderedModel._id.toString(),
              name: orderedModel.name,
              createdAt: orderedModel.createdAt.toISOString(),
              updatedAt: orderedModel.updatedAt.toISOString(),
            };
          }));
        });
      });

      it('must allow the user to sort createdAt desc', () => {
        this.paginationModels.reverse();

        return request(this.app)
        .get(`${BASE_URI}/?sort=createdAt:desc`)
        .expect(200)
        .then(({ body }) => {
          expect(body.paginationModels.length).to.equal(20);
          expect(body.paginationModels).to.deep.equal(this.paginationModels.slice(0, 20).map((orderedModel) => {
            return {
              _id: orderedModel._id.toString(),
              name: orderedModel.name,
              createdAt: orderedModel.createdAt.toISOString(),
              updatedAt: orderedModel.updatedAt.toISOString(),
            };
          }));
        });
      });
    });
  });
});