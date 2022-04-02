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

module.exports = { getAll, getById };