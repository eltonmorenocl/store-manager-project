const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/Sales');

describe("Sales Model", () => {
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
    sinon.stub(salesModel,'getById').resolves(fakeSales[0]);
  } )
  after(() => {
    salesModel.getAll.restore();
    salesModel.getById.restore();
  });

  it("Testa se todas vendas estão sendo retornados", async () => {
    const result = await salesModel.getAll(fakeSales)

    expect(result).to.be.equals(fakeSales);
  });

  it("Testa se é possível listar um determinado venda", async () => {
    const result = await salesModel.getById(fakeSales[0])

    expect(result).to.be.equals(fakeSales[0]);
});

});
