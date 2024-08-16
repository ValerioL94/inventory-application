const express = require('express');
const router = express.Router();
const products_controller = require('../controllers/productsController');

/* GET home page. */
router.get('/', products_controller.index);

module.exports = router;
