const salesValidate = (req, res, next) => {
  console.log(req.body, req.body[0]);
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

module.exports = {
  salesValidate,
};
