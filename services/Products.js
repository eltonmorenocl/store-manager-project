const productsModel = require('../models/Products');

const getAll = async () => {
  const productsAll = await productsModel.getAll();
  return productsAll;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);

  if (!productId || productId.length === 0) return { message: 'Product not found' };

  return productId[0];
  };

module.exports = { getAll, getById };
