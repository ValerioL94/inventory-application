const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  description: { type: String, minLength: 1, maxLength: 500 },
});

CategorySchema.virtual('url').get(function () {
  return `/inventory/category/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
