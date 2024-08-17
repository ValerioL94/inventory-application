const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { ADMIN_PASSWORD } = process.env;
const db = require('../db/queries');

exports.index = asyncHandler(async (req, res, next) => {
  const [categories, products] = await Promise.all([
    db.countCategories(),
    db.countProducts(),
  ]);
  res.render('index', {
    title: 'Homepage',
    category_count: categories,
    product_count: products,
  });
});

exports.product_list = asyncHandler(async (req, res, next) => {
  const products = await db.getProducts();
  res.render('product_list', { title: 'Products', product_list: products });
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await db.getProductDetails(req.params.id);
  if (product === null) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.render('product_detail', { title: product.name, product });
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  const categories = await db.getCategories();
  res.render('product_form', {
    title: 'New Product',
    categories,
    form_type: 'create',
  });
});

exports.product_create_post = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('Name must contain at least 2 characters'),
  body('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .escape()
    .withMessage('Description must contain less than 500 characters'),
  body('category', 'Please select a valid category')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    'price',
    'Minimum price 1, maximum price 100, numbers only, max 2 decimals'
  )
    .trim()
    .isLength({ min: 1 })
    .toFloat()
    .isFloat({ min: 0.01, max: 100.99 })
    .escape(),
  body(
    'stock',
    'Minimum stock quantity 0, maximum stock quantity 100, numbers only'
  )
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 0, max: 100 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    };
    if (!errors.isEmpty()) {
      const categories = await db.getCategories();
      return res.render('product_form', {
        title: 'New Product',
        categories,
        product,
        errors: errors.array(),
        form_type: 'create',
      });
    }
    await db.insertProduct(product);
    res.redirect('/products');
  }),
];

exports.product_update_get = asyncHandler(async (req, res, next) => {
  const [product, categories] = await Promise.all([
    db.getProductDetails(req.params.id),
    db.getCategories(),
  ]);

  if (product === null) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.render('product_form', {
    title: 'Update Product',
    product,
    categories,
    form_type: 'update',
  });
});

exports.product_update_post = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .unescape('&#x27;')
    .withMessage('Name must contain at least 2 characters'),
  body('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .escape()
    .unescape('&#x27;')
    .withMessage('Description must contain less than 500 characters'),
  body('category', 'Category must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    'price',
    'Minimum price 1, maximum price 100, numbers only, max 2 decimals'
  )
    .trim()
    .isLength({ min: 1 })
    .toFloat()
    .isFloat({ min: 0.01, max: 100.99 })
    .escape(),
  body(
    'stock',
    'Minimum stock quantity 0, maximum stock quantity 100, numbers only'
  )
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 0, max: 100 })
    .escape(),
  body('password', "Wrong password, You don't have the right.")
    .trim()
    .escape()
    .equals(ADMIN_PASSWORD),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    };
    if (!errors.isEmpty()) {
      const categories = db.getCategories();
      return res.render('product_form', {
        title: 'Update Product',
        product,
        categories,
        errors: errors.array(),
        form_type: 'update',
      });
    }
    await db.updateProduct(product);
    res.redirect('/products');
  }),
];
/*
exports.product_delete_get = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();
  if (product === null) {
    return res.redirect('/inventory/products');
  }
  res.render('product_delete', { title: 'Delete Product', product });
});

exports.product_delete_post = [
  body('password', "Wrong password, You don't have the right.")
    .trim()
    .escape()
    .equals(adminPassword),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = await Product.findById(req.params.id).exec();
    if (!errors.isEmpty()) {
      return res.render('product_delete', {
        title: 'Delete Product',
        product,
        errors: errors.array(),
      });
    }
    await Product.findByIdAndDelete(req.body.productId);
    res.redirect('/inventory/products');
  }),
];

*/
