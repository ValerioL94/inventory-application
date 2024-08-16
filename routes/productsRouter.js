const express = require('express');
const router = express.Router();
const products_controller = require('../controllers/productsController');

router.get('/', products_controller.products_list);

router.get('/create', products_controller.products_create_get);
router.post('/create', products_controller.products_create_post);
router.get('/:id/delete', products_controller.products_delete_get);
router.post('/:id/delete', products_controller.products_delete_post);
router.get('/products/:id/update', products_controller.products_update_get);
router.post('/:id/update', products_controller.products_update_post);
router.get('/:id', products_controller.products_detail);

module.exports = router;
