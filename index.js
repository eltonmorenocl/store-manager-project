require('dotenv').config();
const express = require('express');
const productController = require('./controllers/Products');
const salesController = require('./controllers/Sales');
const { productValidate } = require('./middlewares/productsValidate');
const { salesValidate } = require('./middlewares/salesValidate');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.post('/products', productValidate, productController.create);

app.put('/products/:id', productValidate, productController.update);

app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesValidate, salesController.create);

app.put('/sales/:id', salesValidate, salesController.update);

app.delete('/sales/:id', salesController.deleteSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
