const Album = require('../models/album');
const Band = require('../models/band');
const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  const [allAlbums, allBands, allGenres] = await Promise.all([
    Album.countDocuments({}).exec(),
    Band.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);
  res.render('index', {
    title: 'Homepage',
    album_count: allAlbums,
    band_count: allBands,
    genre_count: allGenres,
  });
});

exports.album_list = asyncHandler(async (req, res, next) => {
  const allAlbums = await Album.find({}, 'title band')
    .sort({ title: 1 })
    .populate('band')
    .exec();
  res.render('album_list', { title: 'Album list', album_list: allAlbums });
});

exports.album_detail = asyncHandler(async (req, res, next) => {
  res.send(`WiP: Album detail: ${req.params.id}`);
});

exports.album_create_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Album create GET');
});

exports.album_create_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Album create POST');
});

exports.album_delete_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Album delete GET');
});

exports.album_delete_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Album delete POST');
});

exports.album_update_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Album update GET');
});

exports.album_update_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Album update POST');
});
