const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

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
  res.send('WiP: product create GET');
});

exports.product_create_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: product create POST');
});

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
