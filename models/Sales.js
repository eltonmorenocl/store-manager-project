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
StoreManager.sales_products AS sp
INNER JOIN 
StoreManager.sales AS s 
ON 
sp.sale_id = s.id 
WHERE sale_id = ?
ORDER BY productId;`,
[id]);
return sale;
};

const createSale = async () => {
  const [results] = await connection.execute(`INSERT INTO 
  StoreManager.sales (date) VALUES (NOW())`);
  return results;
};

const create = async (insertId, productId, quantity) => {
  const [sale] = await connection.execute(`INSERT INTO 
    StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?)`, [insertId, productId, quantity]);
    return sale;
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

const deleteSale = async (id) => {
  await connection.execute(`DELETE FROM 
  StoreManager.sales WHERE id = ?`, [id]);
  
  await connection.execute(`DELETE
  FROM StoreManager.sales_products WHERE sale_id = ?`, [id]);
};

module.exports = { getAll, getById, createSale, create, update, deleteSale };