const express = require('express');
const router = express.Router();

const album_controller = require('../controllers/albumController');
const band_controller = require('../controllers/bandController');
const genre_controller = require('../controllers/genreController');

router.get('/', album_controller.index);
router.get('/album/create', album_controller.album_create_get);
router.post('/album/create', album_controller.album_create_post);
router.get('/album/:id/delete', album_controller.album_delete_get);
router.post('/album/:id/delete', album_controller.album_delete_post);
router.get('/album/:id/update', album_controller.album_update_get);
router.post('/album/:id/update', album_controller.album_update_post);
router.get('/album/:id', album_controller.album_detail);
router.get('/albums', album_controller.album_list);

router.get('/band/create', band_controller.band_create_get);
router.post('/band/create', band_controller.band_create_post);
router.get('/band/:id/delete', band_controller.band_delete_get);
router.post('/band/:id/delete', band_controller.band_delete_post);
router.get('/band/:id/update', band_controller.band_update_get);
router.post('/band/:id/update', band_controller.band_update_post);
router.get('/band/:id', band_controller.band_detail);
router.get('/bands', band_controller.band_list);

router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post);
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
router.post('/genre/:id/delete', genre_controller.genre_delete_post);
router.get('/genre/:id/update', genre_controller.genre_update_get);
router.post('/genre/:id/update', genre_controller.genre_update_post);
router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genres', genre_controller.genre_list);

module.exports = router;
