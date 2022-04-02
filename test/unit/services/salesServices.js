const { expect } = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../services/Sales');
const salesModel = require('../../../models/Sales');
const { object } = require('joi');


describe("Sales Services", () => {
  const fakeSales = [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ]
  before(() => {
    sinon.stub(salesModel,'getAll').resolves(fakeSales);
    sinon.stub(salesModel,'getById').resolves(object);
  });
  
  after(() => {
    salesModel.getAll.restore();
    salesModel.getById.restore();

  });

  it("Testa se todas vendas estão sendo retornados", async () => {
    const result = await salesModel.getAll(fakeSales);

    expect(result).to.be.equals(fakeSales);
  });

  it("Testa se é possível listar um determinada venda", async () => {
    const result = await salesServices.getById(1);

    expect(result).to.be.an('object');
  });

  it('Testa se função GetAll retorna mensagem de erro', async () => {
    const result = await salesServices.getById(true)
  
    expect(result.message).to.be.equals('Sale not found');
  })

});