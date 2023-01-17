const salesModel = require('../models/Sales');
const productsModel = require('../models/Products');

const getAll = async () => {
  const salesAll = await salesModel.getAll();
  return salesAll;
};

const getById = async (id) => {
  const saleId = await salesModel.getById(id);
  
  if (!saleId || saleId.length === 0) return { message: 'Sale not found' };

  return saleId;
};

const create = async (sales) => {
  const saleCreated = await salesModel.createSale(sales);

  await Promise.all(sales.map(async (sale) => {
    await salesModel.create(saleCreated.insertId, sale.productId, sale.quantity);
    const [getQuantProducts] = await productsModel.getById(sale.productId);
    const result = getQuantProducts.quantity - sale.quantity;
    await productsModel.updateQuantity(sale.productId, result);  
  }));

  return { id: saleCreated.insertId, itemsSold: sales };
};

const update = async (id, productId, quantity) => {
  const saleUpdate = await salesModel.update(id, productId, quantity);
  return saleUpdate;
};

const deleteSale = async (id) => {
  const [saleId] = await salesModel.getById(id);

  if (undefined) return { message: 'Sale not found' };

  const [getQuantProducts] = await productsModel.getById(saleId.productId);
  const result = getQuantProducts.quantity + saleId.quantity;
  await productsModel.updateQuantity(saleId.productId, result); 
  
  await salesModel.deleteSale(id);
  return {};
};

module.exports = { getAll, getById, create, update, deleteSale };