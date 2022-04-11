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
  const fakeUpdatedSale = {
    saleId: 1,
    itemUpdated: [
      {
        productId: 1,
        quantity: 6
      }
    ]

  };
  before(() => {
    sinon.stub(salesModel,'getAll').resolves(fakeSales);
    sinon.stub(salesModel,'getById').resolves(object);
    sinon.stub(salesModel, 'update').resolves(fakeUpdatedSale);
  });
  
  after(() => {
    salesModel.getAll.restore();
    salesModel.getById.restore();
    salesModel.update.restore();

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

  it('Testa se retorna um objeto com as propriedades saleId" and "itemUpdated"', async () => {
    const saleId = 1;
    const salesProducts = [
      {
        productId: 1,
        quantity: 6
      }
    ];

    const result = await salesServices.update(saleId, salesProducts);

    expect(result).to.be.an('object');
    expect(result).to.have.property('saleId', saleId);
    expect(result).to.have.deep.property('itemUpdated', salesProducts);
  })

});