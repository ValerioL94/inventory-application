#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Album = require('./models/album');
const Band = require('./models/band');
const Genre = require('./models/genre');

const genres = [];
const bands = [];
const albums = [];

const mongoose = require('mongoose');

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createGenres();
  await createBands();
  await createAlbums();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function bandCreate(index, name, genre, origin, formed_in, disbanded_in) {
  const banddetail = {
    name: name,
    genre: genre,
  };
  if (origin != false) banddetail.origin = origin;
  if (formed_in != false) banddetail.formed_in = formed_in;
  if (disbanded_in != false) banddetail.disbanded_in = disbanded_in;

  const band = new Band(banddetail);

  await band.save();
  bands[index] = band;
  console.log(`Added band: ${name}`);
}

async function albumCreate(
  index,
  title,
  description,
  band,
  genre,
  price,
  format,
  stock
) {
  const albumdetail = {
    title: title,
    band: band,
    genre: genre,
    price: price,
    format: format,
    stock: stock,
  };
  if (description != false) albumdetail.description = description;

  const album = new Album(albumdetail);
  await album.save();
  albums[index] = album;
  console.log(`Added album: ${title}`);
}

async function createGenres() {
  console.log('Adding genres');
  await Promise.all([
    genreCreate(0, 'Heavy metal'),
    genreCreate(1, 'Nu metal'),
    genreCreate(2, 'Alternative metal'),
    genreCreate(3, 'Math metal'),
    genreCreate(4, 'Thrash metal'),
    genreCreate(5, 'Progressive metal'),
    genreCreate(6, 'Melodic death metal'),
    genreCreate(7, 'Metalcore'),
    genreCreate(8, 'Hard rock'),
    genreCreate(9, 'Power metal'),
    genreCreate(10, 'Symphonic metal'),
    genreCreate(11, 'Speed metal'),
    genreCreate(12, 'Neoclassical metal'),
  ]);
}

async function createBands() {
  console.log('Adding bands');
  await Promise.all([
    bandCreate(
      0,
      'Sonata Arctica',
      [genres[9], genres[10], genres[5]],
      'Kemi, Finland',
      1995,
      false
    ),
    bandCreate(
      1,
      'DragonForce',
      [genres[9], genres[11], genres[5]],
      'London, England',
      1999,
      false
    ),
    bandCreate(
      2,
      'Stratovarius',
      [genres[9], genres[12], genres[10], genres[5]],
      'Helsinki, Finland',
      1984,
      false
    ),
    bandCreate(
      3,
      'Soilwork',
      [genres[6], genres[2]],
      '	Helsingborg, Sweden',
      1995,
      false
    ),
    bandCreate(
      4,
      'System of a Down',
      [genres[2], genres[1], genres[8], genres[5]],
      '	Glendale, California, U.S.',
      1994,
      false
    ),
    bandCreate(
      5,
      'Mudvayne',
      [genres[2], genres[1], genres[5], genres[8]],
      '	Peoria, Illinois, U.S.',
      1996,
      false
    ),
    bandCreate(
      6,
      'Sylosis',
      [genres[4], genres[5], genres[6], genres[7]],
      'Reading, Berkshire, England',
      2000,
      false
    ),
  ]);
}

async function createAlbums() {
  console.log('Adding albums');
  await Promise.all([
    albumCreate(
      0,
      'Unia',
      'Unia (English: Dreams), released on 25 May 2007, is the fifth full-length studio album by the power metal band Sonata Arctica, following the album Reckoning Night.',
      bands[0],
      [genres[9], genres[10], genres[5]],
      20,
      'CD',
      4
    ),
    albumCreate(
      1,
      'Ultra Beatdown',
      'Ultra Beatdown is the fourth studio album by British power metal band DragonForce, released on 20 August 2008 in Japan through JVC and on 26 August 2008 worldwide through Roadrunner Records and Spinefarm Records.',
      bands[1],
      genres[9],
      40,
      'CD',
      5
    ),
    albumCreate(
      2,
      'Nemesis',
      'Nemesis is the fourteenth studio album by power metal band Stratovarius, released on 22 February 2013 through Edel AG.',
      bands[2],
      [genres[9], genres[10]],
      30,
      'Vinyl',
      6
    ),
    albumCreate(
      3,
      'The Living Infinite',
      "The Living Infinite is the ninth studio album by Swedish melodic death metal band Soilwork, released on 27 February 2013 in Asia, 1 March 2013 in Europe, on 4 March 2013 in the UK and on 5 March 2013 in the US. It is the band's first double album.",
      bands[3],
      genres[6],
      42,
      '2 CDs',
      10
    ),
    albumCreate(
      4,
      'Toxicity',
      'Toxicity is the second studio album by the American heavy metal band System of a Down, released on September 4, 2001, by American Recordings and Columbia Records.',
      bands[4],
      [genres[2], genres[1]],
      15,
      'CD',
      22
    ),
    albumCreate(
      5,
      'L.D. 50 ',
      "L.D. 50 is the debut studio album by American heavy metal band Mudvayne. Released on August 22, 2000, it is the band's first release on Epic Records, following the independently-released extended play Kill, I Oughtta.",
      bands[5],
      [genres[0], genres[1], genres[2], genres[3]],
      40,
      'Vinyl',
      3
    ),
    albumCreate(
      6,
      'Cycle of Suffering',
      'Cycle of Suffering is the fifth studio album by British heavy metal band Sylosis, released on 7 February 2020 through Nuclear Blast.',
      bands[6],
      [genres[4], genres[5], genres[6], genres[7]],
      18,
      'CD',
      7
    ),
  ]);
}
