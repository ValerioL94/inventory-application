const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();
  res.render('genre_list', { title: 'Genre list', genre_list: allGenres });
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`WiP: Genre detail: ${req.params.id}`);
});

exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Genre create GET');
});

exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Genre create POST');
});

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Genre delete GET');
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Genre delete POST');
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Genre update GET');
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Genre update POST');
});
