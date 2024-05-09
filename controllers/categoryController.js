const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render('category_list', {
    title: 'Categories',
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, productsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id }, 'name description').exec(),
  ]);
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }
  res.render('category_detail', {
    title: 'Category Detail',
    category,
    category_products: productsInCategory,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: category create GET');
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: category create POST');
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: category delete GET');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: category delete POST');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: category update GET');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: category update POST');
});
