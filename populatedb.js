#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Product = require('./models/product');

const categories = [];
const products = [];

const mongoose = require('mongoose');

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createProducts();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const categorydetail = {
    name: name,
  };
  if (description != false) categorydetail.description = description;
  const category = new Category(categorydetail);
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function productCreate(index, name, description, category, price, stock) {
  const productdetail = {
    name: name,
    category: category,
    price: price,
    stock: stock,
  };
  if (description != false) productdetail.description = description;
  const product = new Product(productdetail);
  await product.save();
  products[index] = product;
  console.log(`Added product: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(
      0,
      'Fruit',
      'Fruits are important sources of dietary fibre, vitamins (especially vitamin C), and antioxidants.'
    ),
    categoryCreate(
      1,
      'Seafood',
      "Fish and other seafood may be humanity's most important food, after cereals, furnishing about 15 percent of the world population's protein intake."
    ),
    categoryCreate(
      2,
      'Meat',
      'Meat is valued as a complete protein food containing all the amino acids necessary for the human body. The fat of meat, which varies widely with the species, quality, and cut, is a valuable source of energy and also influences the flavour, juiciness, and tenderness of the lean. Parts such as livers, kidneys, hearts, and other portions are excellent sources of vitamins and of essential minerals, easily assimilated by the human system.'
    ),
    categoryCreate(
      3,
      'Beverages',
      'Although most adults drink one to two litres (about one to two quarts) of water a day, much of this is in the form of liquids such as coffee, tea, fruit juices, and soft drinks.'
    ),
    categoryCreate(
      4,
      'Snacks',
      'Snacks come in a variety of forms including fresh ingredients and packaged and processed foods. '
    ),
  ]);
}

async function createProducts() {
  console.log('Adding products');
  await Promise.all([
    productCreate(
      0,
      'Apples(3kg)',
      'A reference serving of a raw apple with skin weighing 100 grams provides 52 calories and a moderate content of dietary fiber.',
      categories[0],
      10,
      25
    ),
    productCreate(
      1,
      'Bananas(1kg)',
      'A reference amount of 100 grams (3.5 oz) supplies 89 calories, 31% of the Daily Value of vitamin B6, and moderate amounts of vitamin C, manganese, potassium, and dietary fiber.',
      categories[0],
      4,
      18
    ),
    productCreate(
      2,
      'Atlantic salmon(500g)',
      "Salmon is considered to be healthy due to the fish's high protein, high omega-3 fatty acids, and high vitamin D content.",
      categories[1],
      20,
      7
    ),
    productCreate(
      3,
      'Oysters(6pcs)',
      'Oysters are an excellent source of zinc, iron, calcium, and selenium, as well as vitamin A and vitamin B12.',
      categories[1],
      24,
      5
    ),
    productCreate(
      4,
      'Coca-cola(2L)',
      'Coca-Cola Original Taste — the crisp, refreshing taste you know and love',
      categories[3],
      3,
      23
    ),
    productCreate(
      5,
      'Sprite(12pack)',
      'Clear, crisp lemon-lime soda will keep you invigorated and inspired​',
      categories[3],
      8,
      33
    ),
    productCreate(
      6,
      'Snickers(50g)',
      'Snickers Full Size Candy Chocolate Bar ',
      categories[4],
      2,
      11
    ),
    productCreate(
      7,
      "Lay's(230g)",
      "Lay's Classic Potato Chips Snack Chips",
      categories[4],
      3,
      15
    ),
  ]);
}
