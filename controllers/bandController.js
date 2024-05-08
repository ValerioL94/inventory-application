const Band = require('../models/band');
const asyncHandler = require('express-async-handler');

exports.band_list = asyncHandler(async (req, res, next) => {
  const allBands = await Band.find().sort({ name: 1 }).exec();
  res.render('band_list', { title: 'Band List', band_list: allBands });
});

exports.band_detail = asyncHandler(async (req, res, next) => {
  res.send(`WiP: Band detail: ${req.params.id}`);
});

exports.band_create_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Band create GET');
});

exports.band_create_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Band create POST');
});

exports.band_delete_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Band delete GET');
});

exports.band_delete_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Band delete POST');
});

exports.band_update_get = asyncHandler(async (req, res, next) => {
  res.send('WiP: Band update GET');
});

exports.band_update_post = asyncHandler(async (req, res, next) => {
  res.send('WiP: Band update POST');
});
