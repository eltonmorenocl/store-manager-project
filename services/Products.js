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

const create = async ({ name, quantity }) => {
  const nameProduct = await productsModel.getByName({ name });  
    
    if (nameProduct) return { code: 409, message: 'Product already exists' };
    
  const productCreated = productsModel.create({ name, quantity });  
  
  return productCreated;
    };

const update = async (id, name, quantity) => {
  const [productIdUpdate] = await productsModel.getById(id);
  if (!productIdUpdate) {
    return { message: 'Product not found' };
  }
  const productUpdate = await productsModel.update(name, quantity, id);
  return productUpdate;
};

module.exports = { getAll, getById, create, update };
