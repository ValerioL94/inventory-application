const pool = require('./pool');

// getCategoriesDetails;
// insertCategories;
// updateCategories;
// deleteCategories;

// getProductsDetails;
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
    'SELECT name FROM categories ORDER BY name'
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
  const { rows } = await pool.query('SELECT name FROM products ORDER BY name');
  return rows;
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
  countProducts,
  getProducts,
};
