const productsModel = require('../models/Products');

const salesValidate = (req, res, next) => {
  if (!req.body[0].productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  if (req.body[0].quantity === undefined) { 
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (req.body[0].quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
    next();
};

const quantitySaleStore = async (req, res, next) => {
  const [getQuantProducts] = await productsModel.getById(req.body[0].productId);
  if (req.body[0].quantity > getQuantProducts.quantity) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = {
  salesValidate,
  quantitySaleStore,
};
