const salesServices = require('../services/Sales');

const getAll = async (req, res) => {
  const salesAll = await salesServices.getAll();
  
  if (salesAll.message) return res.status(404).json({ message: salesAll.message });
    
  return res.status(200).json(salesAll);
};

const getById = async (req, res) => {
  const { id } = req.params;
    const saleId = await salesServices.getById(id);
    
    if (saleId.message) return res.status(404).json(saleId);
    return res.status(200).json(saleId);
};

const create = async (req, res) => {
  try {
    const sale = await salesServices.create(req.body);
    return res.status(201).json(sale);
  } catch (error) {
    return res.status(409).json({ message: 'erro de servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    // console.log('controller', id, productId, quantity);
    const updateSale = await salesServices.update(id, productId, quantity);
    return res.status(200).json(updateSale);
  } catch (error) {
    return res.status(404).json({ message: 'Error Servidor' });
  } 
};

module.exports = { getAll, getById, create, update };