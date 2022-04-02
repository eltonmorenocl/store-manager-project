const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../services/Products');
const productsModel = require('../../../models/Products');
const { object } = require('joi');


describe("Produtcs Services", () => {
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
    sinon.stub(productsModel,'getAll').resolves(fakeProdutcs);
    sinon.stub(productsModel,'getById').resolves(object);
  });
  
  after(() => {
    productsModel.getAll.restore();
    productsModel.getById.restore();

  });

  it("Testa se todos produtos estão sendo retornados", async () => {
    const result = await productsModel.getAll(fakeProdutcs);

    expect(result).to.be.equals(fakeProdutcs);
  });

  it("Testa se é possível listar um determinado produto", async () => {
    const result = await productsServices.getById(1);

    expect(result).to.be.an('object');
  });

  it('Testa se função GetById retorna mensagem de erro', async () => {
    const result = await productsServices.getById(true)
  
    expect(result.message).to.be.equals('Product not found');
  })

});