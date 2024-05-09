const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { category_list } = require('./categoryController');

exports.index = asyncHandler(async (req, res, next) => {
  const [allCategories, allProducts] = await Promise.all([
    Category.countDocuments({}).exec(),
    Product.countDocuments({}).exec(),
  ]);
  res.render('index', {
    title: 'Homepage',
    category_count: allCategories,
    product_count: allProducts,
  });
});

exports.product_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({}, 'name category')
    .sort({ title: 1 })
    .populate('category')
    .exec();
  res.render('product_list', { title: 'Products', product_list: allProducts });
});

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
      res.render('product_form', {
        title: 'New Product',
        categories: allCategories,
        product,
        errors: errors.array(),
      });
    } else {
      await product.save();
      res.redirect('product.url');
    }
  }),
];

exports.product_delete_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: product delete GET');
});

exports.product_delete_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: product delete POST');
});

exports.product_update_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: product update GET');
});

exports.product_update_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: product update POST');
});
