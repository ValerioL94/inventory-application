const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');
const { ADMIN_PASSWORD } = process.env;

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await db.getCategories();
  if (categories === null) {
    return res.redirect('/');
  }
  res.render('category_list', {
    title: 'Categories',
    category_list: categories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, productsInCategory] = await Promise.all([
    db.getCategoryDetails(req.params.id),
    db.getProductsInCategory(req.params.id),
  ]);
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }
  res.render('category_detail', {
    title: category.name,
    category: category,
    products: productsInCategory,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'New Category', form_type: 'create' });
});

exports.category_create_post = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Name must contain at least 3 characters.'),
  body('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .escape()
    .withMessage('Description must contain less than 500 characters.'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = {
      name: req.body.name,
      description: req.body.description,
    };
    if (!errors.isEmpty()) {
      return res.render('category_form', {
        title: 'New Category',
        category,
        errors: errors.array(),
        form_type: 'create',
      });
    }
    await db.insertCategory(category);
    res.redirect('/categories');
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await db.getCategoryDetails(req.params.id);
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }
  res.render('category_form', {
    title: 'Update Category',
    category,
    form_type: 'update',
  });
});

exports.category_update_post = [
  body('name', 'Name must contain at least 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('description', 'Description must contain less than 500 characters.')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .escape(),
  body('password', "Wrong password, You don't have the right.")
    .trim()
    .escape()
    .equals(ADMIN_PASSWORD),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = {
      name: req.body.name,
      description: req.body.description,
      id: req.params.id,
    };
    if (!errors.isEmpty()) {
      return res.render('category_form', {
        title: 'Update Category',
        category,
        errors: errors.array(),
        form_type: 'update',
      });
    }
    await db.updateCategory(category);
    res.redirect('/categories');
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, productsInCategory] = await Promise.all([
    db.getCategoryDetails(req.params.id),
    db.getProductsInCategory(req.params.id),
  ]);
  if (category === null) {
    return res.redirect('/categories');
  }
  res.render('category_delete', {
    title: 'Delete Category',
    category,
    products: productsInCategory,
  });
});

exports.category_delete_post = [
  body('password', "Wrong password, You don't have the right.")
    .trim()
    .escape()
    .equals(ADMIN_PASSWORD),
  asyncHandler(async (req, res, next) => {
    const [category, productsInCategory] = await Promise.all([
      db.getCategoryDetails(req.params.id),
      db.getProductsInCategory(req.params.id),
    ]);
    const errors = validationResult(req);
    if (productsInCategory.length) {
      return res.render('category_delete', {
        title: 'Delete Category',
        category,
        products: productsInCategory,
      });
    }
    if (!errors.isEmpty()) {
      return res.render('category_delete', {
        title: 'Delete Category',
        category,
        errors: errors.array(),
      });
    }
    await db.deleteCategory(req.body.categoryId);
    res.redirect('/categories');
  }),
];
