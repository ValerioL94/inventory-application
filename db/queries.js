const pool = require('./pool');

// insertCategories;
// updateCategories;
// deleteCategories;

// insertProducts;
// updateProducts;
// deleteProducts;

async function countCategories() {
  const { rows } = await pool.query(
    'SELECT COUNT(*) AS categories FROM categories'
  );
  return rows[0].categories;
}

async function getCategories() {
  const { rows } = await pool.query(
    'SELECT id, name FROM categories ORDER BY name'
  );
  return rows;
}

async function getCategoryDetails(id) {
  const { rows } = await pool.query(
    'SELECT categories.id, categories.name, categories.description FROM categories WHERE categories.id = $1;',
    [id]
  );
  return rows[0];
}

async function getProductsInCategory(id) {
  const { rows } = await pool.query(
    'SELECT products.id, products.name, products.description, products.price, products.stock FROM products WHERE products.category_id = $1;',
    [id]
  );
  return rows;
}

async function countProducts() {
  const { rows } = await pool.query(
    'SELECT COUNT(*) AS products FROM products'
  );
  return rows[0].products;
}

async function getProducts() {
  const { rows } = await pool.query(
    'SELECT id, name FROM products ORDER BY name'
  );
  return rows;
}

async function getProductDetails(id) {
  const { rows } = await pool.query(
    'SELECT products.id, products.name, products.description, products.price, products.stock, categories.id as category_id, categories.name as category FROM products JOIN categories ON products.category_id = categories.id WHERE products.id = $1;',
    [id]
  );
  return rows[0];
}
// async function insertMessages(username, comment) {
//   await pool.query('INSERT INTO messages (username, comment) VALUES ($1, $2)', [
//     username,
//     comment,
//   ]);
// }

module.exports = {
  countCategories,
  getCategories,
  getCategoryDetails,
  getProductsInCategory,
  getProductDetails,
  countProducts,
  getProducts,
  getProductDetails,
};