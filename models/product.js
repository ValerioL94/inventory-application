const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  description: { type: String, maxLength: 500 },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, min: 1, max: 100 },
  stock: { type: Number, required: true, min: 0, max: 100 },
});

ProductSchema.virtual('url').get(function () {
  return `/inventory/product/${this._id}`;
});
ProductSchema.virtual('get_price').get(function () {
  return `€${this.price.toString()}`;
});

module.exports = mongoose.model('Product', ProductSchema);
