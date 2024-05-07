const Album = require('../models/album');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  res.send('WiP: Site Home Page');
});

exports.album_list = asyncHandler(async (req, res, next) => {
  res.send('WiP: Album list');
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
