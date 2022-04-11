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

  const fakeCreate = {
    name: 'Martelo de Thor',
    quantity: 200
  };

  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeProdutcs]);
    sinon.stub(productModel,'getById').resolves({
      "id": 1,
      "name": "produto A",
      "quantity": 10
    });
    sinon.stub(productModel,'getByName').resolves(fakeCreate);
    sinon.stub(productModel,'create').resolves({
      id: 2,
      name: "produto B",
      quantity: 100,
  });
  });

  after(() => {
    connection.execute.restore();
    productModel.getById.restore();
    productModel.getByName.restore();
    productModel.create.restore();
  });

  it("Testa se todos produtos estão sendo retornados", async () => {
    const result = await productModel.getAll(fakeProdutcs);

    expect(result).to.be.equals(fakeProdutcs);
  });

  it("Testa se é possível listar um determinado produto", async () => {
    const result = await productModel.getById(1);

    expect(result).to.be.an('object');
});

it("Testa se é possível busca um determinado produto pelo nome", async () => {
  const result = await productModel.getByName('Martelo de Thor');

  expect(result).to.be.an('object');
  expect(result).to.have.property('name', "Martelo de Thor");
});

  it("Testa se é possível listar um criar produto", async () => {
    const createProduct = await productModel.create("produto B", 100);

    expect(createProduct).to.be.an('object');
    expect(createProduct).to.have.property('name', "produto B");
    expect(createProduct).to.have.property('quantity', 100);
});

});
