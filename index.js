require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const productsRoute = require('./routes/products');
const salesRoute = require('./routes/sales');

const app = express();
app.use(express.json());
 
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
