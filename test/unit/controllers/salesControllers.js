const { expect } = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../services/Sales');
const salesControllers = require('../../../controllers/Sales');

describe("Sales Controllers", () => {
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

  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns(response);

    sinon.stub(salesServices,'getAll').resolves(fakeSales);
    sinon.stub(salesControllers,'getById').resolves();
  });
  
  after(() => {
    salesServices.getAll.restore();
    salesControllers.getById.restore();

  });

  it('Testa se função GetAll retorna status e mensagem de erro', async () => {
    await salesControllers.getAll(request, response)
  
    expect(response.status.calledWith(200)).to.be.equal(true)
    expect(response.json.calledWith(fakeSales)).to.be.equal(true)
  })

  it('Testa se função GetById retorna status e mensagem de erro', async () => {
    await salesControllers.getById(request, response)
  
    expect(response.status.calledWith(200)).to.be.equal(true)
    expect(response.json.calledWith(fakeSales[0])).to.be.equal(false)
  })
  

});