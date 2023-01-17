const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const getById = async (id) => {
const [product] = await connection.execute(`SELECT * FROM 
StoreManager.products WHERE id = ?`, [id]);
if (product.length === 0) return null;
return product;
};

const create = async ({ name, quantity }) => {
const [{ insertId }] = await connection.execute(`INSERT INTO 
StoreManager.products (name, quantity) VALUES (?, ?)`, [name, quantity]);
  return {
      id: insertId,
      name,
      quantity,
  };
};

const getByName = async ({ name }) => {
  const query = `SELECT
  * FROM StoreManager.products WHERE name = ?`;
  const [productName] = await connection.execute(query, [name]);
  if (productName.length === 0) return null;
  return productName;
};

const update = async (name, quantity, id) => {
  const [productUpdate] = await connection.execute(`UPDATE 
  StoreManager.products SET name = ?, quantity = ? WHERE id = ?`, [name, quantity, id]);
  if (productUpdate.length === 0) return null;
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const [productDel] = await connection.execute(`DELETE FROM 
  StoreManager.products WHERE id = ?`, [id]);
  return productDel;
};

const updateQuantity = async (id, quantity) => {
  await connection.execute(`UPDATE
  StoreManager.products SET quantity = ? WHERE id = ?;`, [quantity, id]);
};

module.exports = { 
  getAll, 
  getById, 
  create, 
  getByName, 
  update, 
  deleteProduct, 
  updateQuantity, 
  };