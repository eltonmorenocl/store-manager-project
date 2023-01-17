const express = require('express');
const salesController = require('../controllers/Sales');
const { salesValidate, quantitySaleStore } = require('../middlewares/salesValidate');

const route = express.Router();

route.get('/', salesController.getAll);

route.get('/:id', salesController.getById);

route.post('/', salesValidate, quantitySaleStore, salesController.create);

route.put('/:id', salesValidate, salesController.update);

route.delete('/:id', salesController.deleteSale);

module.exports = route;