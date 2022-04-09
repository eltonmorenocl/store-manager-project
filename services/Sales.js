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

const create = async (sale) => {
  const saleCreated = await salesModel.create(sale);  
  return saleCreated;
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