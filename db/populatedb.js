#! /usr/bin/env node

const { Client } = require('pg');
const { CONNECTION_STRING } = process.env;

const SQL1 = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  description TEXT
);

INSERT INTO categories (name, description) 
VALUES
  ('Fruit', 'Fruits are important sources of dietary fibre, vitamins (especially vitamin C), and antioxidants.'),
  ('Seafood', 'Fish and other seafood may be humanity''s most important food, after cereals, furnishing about 15 percent of the world population''s protein intake.'),
  ('Meat', 'Meat is valued as a complete protein food containing all the amino acids necessary for the human body. The fat of meat, which varies widely with the species, quality, and cut, is a valuable source of energy and also influences the flavour, juiciness, and tenderness of the lean. Parts such as livers, kidneys, hearts, and other portions are excellent sources of vitamins and of essential minerals, easily assimilated by the human system.'),
  ('Beverages', 'Although most adults drink one to two litres (about one to two quarts) of water a day, much of this is in the form of liquids such as coffee, tea, fruit juices, and soft drinks.'),
  ('Snacks', 'Snacks come in a variety of forms including fresh ingredients and packaged and processed foods. ');
`;

const SQL2 = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories,
  price REAL,
  stock INTEGER
);

INSERT INTO products (name, description, category, price, stock) 
VALUES
  ('Bananas(1kg)',
  'A reference amount of 100 grams (3.5 oz) supplies 89 calories, 31% of the Daily Value of vitamin B6, and moderate amounts of vitamin C, manganese, potassium, and dietary fiber.',
  1,
  3.55,
  18),
  ('Atlantic salmon(500g)',
  'Salmon is considered to be healthy due to the fish''s high protein, high omega-3 fatty acids, and high vitamin D content.',
  2,
  20.99,
  7),
  ('Oysters(100g)',
  'Oysters are an excellent source of zinc, iron, calcium, and selenium, as well as vitamin A and vitamin B12.',
  2,
  24.99,
  5),
  ('Coca-cola(2L)',
  'Coca-Cola Original Taste — the crisp, refreshing taste you know and love.',
  4,
  3.50,
  23),
  ('Sprite(12pack)',
  'Clear, crisp lemon-lime soda will keep you invigorated and inspired.',
  4,
  7.99,
  33),
  ('Snickers(50g)',
  'Snickers Full Size Candy Chocolate Bar.',
  5,
  0.99,
  44),
  ('Lay''s(230g)',
  'Lay''s Classic Potato Chips Snack Chips.',
  5,
  2.99,
  15);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: CONNECTION_STRING,
  });
  await client.connect();
  console.log('Adding categories...');
  await client.query(SQL1);
  console.log('Adding products...');
  await client.query(SQL2);

  await client.end();
  console.log('done');
}

main();
