const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const adminPassword = process.env.admin_password;
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
/*
exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('category')
    .exec();
  if (product === null) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.render('product_detail', { title: product.name, product });
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render('product_form', {
    title: 'New Product',
    categories: allCategories,
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
  body('category', 'Category must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Minimum price 1, maximum price 100, numbers only')
    .trim()
    .isLength({ min: 1 })
    .isInt({ gt: 0, lt: 101 })
    .escape(),
  body(
    'stock',
    'Minimum stock quantity 0, maximum stock quantity 100, numbers only'
  )
    .trim()
    .isLength({ min: 1 })
    .isInt({ gt: 0, lt: 101 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });
    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();
      return res.render('product_form', {
        title: 'New Product',
        categories: allCategories,
        product,
        errors: errors.array(),
        form_type: 'create',
      });
    }
    await product.save();
    res.redirect(product.url);
  }),
];

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

exports.product_update_get = asyncHandler(async (req, res, next) => {
  const [product, allCategories] = await Promise.all([
    Product.findById(req.params.id).populate('category').exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  if (product === null) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.render('product_form', {
    title: 'Update Product',
    product,
    categories: allCategories,
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
  body('price', 'Minimum price 1, maximum price 100, numbers only')
    .trim()
    .isLength({ min: 1 })
    .isInt({ gt: 0, lt: 101 })
    .escape(),
  body(
    'stock',
    'Minimum stock quantity 0, maximum stock quantity 100, numbers only'
  )
    .trim()
    .isLength({ min: 1 })
    .isInt({ gt: 0, lt: 101 })
    .escape(),
  body('password', "Wrong password, You don't have the right.")
    .trim()
    .escape()
    .equals(adminPassword),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();
      return res.render('product_form', {
        title: 'Update Product',
        categories: allCategories,
        product,
        errors: errors.array(),
        form_type: 'update',
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      product,
      {}
    );
    res.redirect(updatedProduct.url);
  }),
];

*/
