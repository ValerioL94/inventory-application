const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/productController');

/* GET home page. */
router.get('/', product_controller.index);

module.exports = router;
