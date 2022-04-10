const salesModel = require('../models/Sales');

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
  // console.log('saleCreated service', saleCreated);  
  await Promise.all(sales.map(async (sale) => {
    await salesModel.create(saleCreated.insertId, sale.productId, sale.quantity);
  }));
 
  return { id: saleCreated.insertId, itemsSold: sales };
};

const update = async (id, productId, quantity) => {
  const saleUpdate = await salesModel.update(id, productId, quantity);
  return saleUpdate;
};

const deleteSale = async (id) => {
  const saleId = await salesModel.getById(id);
  // console.log('saled service', saleId);
  if (!saleId.length) return { message: 'Sale not found' };
  
  await salesModel.deleteSale(id);
  return {};
};

module.exports = { getAll, getById, create, update, deleteSale };