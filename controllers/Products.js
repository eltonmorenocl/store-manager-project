const productsServices = require('../services/Products');

const getAll = async (req, res) => {
  const productsAll = await productsServices.getAll();
  
  if (productsAll.message) return res.status(404).json({ message: productsAll.message });
  
  return res.status(200).json(productsAll);
  };

const getById = async (req, res) => {
  const { id } = req.params;
  const productId = await productsServices.getById(id);

  if (productId.message) return res.status(404).json(productId);
  return res.status(200).json(productId);
};

const create = async (req, res) => {
    const result = await productsServices.create(req.body);

    if (result.message) return res.status(409).json({ message: result.message });
    return res.status(201).json(result);
};

module.exports = { getAll, getById, create };