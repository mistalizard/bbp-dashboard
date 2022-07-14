const fs = require('fs');
const mongoose = require('mongoose');
// dotenv refers to the config.env file we created.
const dotenv = require('dotenv');
const Partner = require('../../models/partnerModel');

dotenv.config({ path: './config.env' });

// We need to connect to the DB in this particular file because it will be something that we only run independently of our express application, so it needs its own DB connection.
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull'));

// READ JSON FILE
// Have to use JSON.parse to convert the info into a JS object before we can do anything with it.
// TEST DATA
const partners = JSON.parse(fs.readFileSync(`${__dirname}/partners.json`, 'utf-8'));

// PROVIDER DATA
// const partners = JSON.parse(
//   fs.readFileSync(`${__dirname}/partners-named.json`, 'utf-8')
// );

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    // .create() can accept an array, and will create a new document for each item in the array.
    await Partner.create(partners);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  // Generally don't use process.exit(), however, since this is just a small script we will use it here in order to exit the process rather than having to ctrl + c our way out of it.
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // Using deleteMany() with no arguments will delete all of the documents in a collection.
    await Partner.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  // Generally don't use process.exit(), however, since this is just a small script we will use it here in order to exit the process rather than having to ctrl + c our way out of it.
  process.exit();
};

// The code below tells node what to do when we use the following commands in the command line
// node dev-data/data/import-dev-data.js --import
// node dev-data/data/import-dev-data.js --delete
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
