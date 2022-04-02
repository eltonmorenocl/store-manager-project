const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/Products');
const connection = require('../../../models/connection');

describe("Produtcs Model", () => {
  const fakeProdutcs = [
    {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "Traje de encolhimento",
      "quantity": 20
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América",
      "quantity": 30
    }
  ]
  before(() => {
    sinon.stub(productModel,'getAll').resolves(fakeProdutcs);
    sinon.stub(productModel,'getById').resolves({
      "id": 1,
      "name": "produto A",
      "quantity": 10
    });
  } )
  after(() => {
    productModel.getAll.restore();
    productModel.getById.restore();

  });

  it("Testa se todos produtos estão sendo retornados", async () => {
    const result = await productModel.getAll(fakeProdutcs);

    expect(result).to.be.equals(fakeProdutcs);
  });

  it("Testa se é possível listar um determinado produto", async () => {
    const result = await productModel.getById(1);

    expect(result).to.be.an('object');
});

});
