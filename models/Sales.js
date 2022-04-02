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

module.exports = { getAll, getById };