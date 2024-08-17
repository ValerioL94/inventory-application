const pool = require('./pool');

// Category queries
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

async function insertCategory(category) {
  await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2);',
    [category.name, category.description]
  );
}

async function updateCategory(category) {
  await pool.query(
    'UPDATE categories SET (name, description) = ($1, $2) WHERE categories.id = $3;',
    [category.name, category.description, category.id]
  );
}
async function deleteCategory(id) {
  await pool.query('DELETE FROM categories WHERE id = $1;', [id]);
}

// Product queries
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
async function getProductsInCategory(id) {
  const { rows } = await pool.query(
    'SELECT products.id, products.name, products.description, products.price, products.stock FROM products WHERE products.category_id = $1;',
    [id]
  );
  return rows;
}
async function insertProduct(product) {
  await pool.query(
    'INSERT INTO products (name, description, category_id, price, stock) VALUES ($1, $2, $3, $4, $5);',
    [
      product.name,
      product.description,
      product.category_id,
      product.price,
      product.stock,
    ]
  );
}
async function updateProduct(product) {
  await pool.query(
    'UPDATE products SET (name, description, category_id, price, stock) = ($1, $2, $3, $4, $5) WHERE products.id = $6;',
    [
      product.name,
      product.description,
      product.category_id,
      product.price,
      product.stock,
      product.id,
    ]
  );
}
async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id = $1;', [id]);
}

module.exports = {
  countCategories,
  getCategories,
  getCategoryDetails,
  insertCategory,
  updateCategory,
  deleteCategory,
  countProducts,
  getProducts,
  getProductDetails,
  getProductsInCategory,
  insertProduct,
  updateProduct,
  deleteProduct,
};
