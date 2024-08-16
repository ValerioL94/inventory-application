const express = require('express');
const router = express.Router();
const categories_controller = require('../controllers/categoriesController');

router.get('/', categories_controller.categories_list);
router.get('/create', categories_controller.categories_create_get);
router.post('/create', categories_controller.categories_create_post);
router.get('/:id/delete', categories_controller.categories_delete_get);
router.post('/:id/delete', categories_controller.categories_delete_post);
router.get('/:id/update', categories_controller.categories_update_get);
router.post('/:id/update', categories_controller.categories_update_post);
router.get('/:id', categories_controller.categories_detail);

module.exports = router;
