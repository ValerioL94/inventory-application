const Genre = require('../models/genre');
const Album = require('../models/album');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();
  res.render('genre_list', { title: 'Genre List', genre_list: allGenres });
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, albumsInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Album.find({ genre: req.params.id }, 'title description').exec(),
  ]);
  if (genre === null) {
    const err = new Error('Genre not found');
    err.status = 404;
    return next(err);
  }
  res.render('genre_detail', {
    title: 'Genre Detail',
    genre,
    genre_albums: albumsInGenre,
  });
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
