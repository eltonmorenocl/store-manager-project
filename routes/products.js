const express = require('express');
const productController = require('../controllers/Products');
const { productValidate } = require('../middlewares/productsValidate');

const route = express.Router();

route.get('/', productController.getAll);

route.get('/:id', productController.getById);

route.post('/', productValidate, productController.create);

route.put('/:id', productValidate, productController.update);

route.delete('/:id', productController.deleteProduct);

module.exports = route;
