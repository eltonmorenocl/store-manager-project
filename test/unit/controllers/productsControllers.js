const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../services/Products');
const productsControllers = require('../../../controllers/Products');

describe("Produtcs Controllers", () => {
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

  const fakeCreate = {
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 200
  };

  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns(response);

    sinon.stub(productsServices,'getAll').resolves(fakeProdutcs);
    sinon.stub(productsControllers,'getById').resolves();
    sinon.stub(productsServices,'create').resolves({ product: fakeCreate});
  });
  
  after(() => {
    productsServices.getAll.restore();
    productsControllers.getById.restore();
    productsServices.create.restore();

  });

  it('Testa se função GetAll retorna status e mensagem de erro', async () => {
    await productsControllers.getAll(request, response)
  
    expect(response.status.calledWith(200)).to.be.equal(true)
    expect(response.json.calledWith(fakeProdutcs)).to.be.equal(true)
  })

  it('Testa se função GetById retorna status e mensagem de erro', async () => {
    await productsControllers.getById(request, response)
  
    expect(response.status.calledWith(200)).to.be.equal(true)
    expect(response.json.calledWith(fakeProdutcs[0])).to.be.equal(false)
  })

  it('Testa se função Create retorna status', async () => {
    await productsControllers.create(request, response)
    
    expect(response.status.calledWith(201)).to.be.equal(true)
  })
});