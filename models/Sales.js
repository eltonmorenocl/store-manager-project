const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`SELECT 
  s.id AS saleId, 
  s.date, 
  sp.product_id AS productId,
  sp.quantity 
FROM 
StoreManager.sales AS s
INNER JOIN 
StoreManager.sales_products AS sp
ON sp.sale_id = s.id
ORDER BY s.id, sp.product_id;`);
  
  return sales;
};

const getById = async (id) => {
const [sale] = await connection.execute(`SELECT 
s.date, 
sp.product_id AS productId, 
sp.quantity 
FROM 
sales_products AS sp
INNER JOIN 
sales AS s 
ON 
sp.sale_id = s.id 
WHERE sale_id = ?
ORDER BY productId;`,
[id]);

return sale;
};

const create = async (productId, quantity) => {
  const [{ insertId }] = await connection.execute(`INSERT INTO 
  StoreManager.sales (date) VALUES (NOW())`);
  const [products] = [productId, quantity];
  // console.log(products);
  await (products.map((item) => {
  connection.execute(`INSERT INTO 
  StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES (?, ?, ?)`, [insertId, item.productId, item.quantity]);
  
  // console.log(products);
  // console.log(item);
  return products;
  }));

  return {
    id: insertId,
    itemsSold: [...products],
  }; 
};

const update = async (id, productId, quantity) => {
  await connection.execute(`UPDATE
  StoreManager.sales_products SET quantity = ? WHERE product_id = ?;`, [quantity, productId]);
return {
  saleId: id,
  itemUpdated: [
    {
      productId,
      quantity,
    },
  ],
};
};

module.exports = { getAll, getById, create, update };