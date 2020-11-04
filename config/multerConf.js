const multer = require('multer');
const path = require('path');
const shortid = require('shortid');

const categories = multer.diskStorage({
  // Set the destination
  destination: './public/uploads/categories',
  // Set the filename
  filename: (req, file, setFilenameCallback) => {
    setFilenameCallback(null, shortid.generate() + path.extname(file.originalname));
  }
});

const products = multer.diskStorage({
  // Set the destination
  destination: './public/uploads/products',
  // Set the filename
  filename: (req, file, setFilenameCallback) => {
    setFilenameCallback(null, shortid.generate() + path.extname(file.originalname));
  }
});

const recipes = multer.diskStorage({
  // Set the destination
  destination: './public/uploads/recipes',
  // Set the filename
  filename: (req, file, setFilenameCallback) => {
    setFilenameCallback(null, shortid.generate() + path.extname(file.originalname));
  }
});

const prizes = multer.diskStorage({
  // Set the destination
  destination: './public/uploads/prizes',
  // Set the filename
  filename: (req, file, setFilenameCallback) => {
    setFilenameCallback(null, shortid.generate() + path.extname(file.originalname));
  }
});

const promos = multer.diskStorage({
  // Set the destination
  destination: './public/uploads/promos',
  // Set the filename
  filename: (req, file, setFilenameCallback) => {
    setFilenameCallback(null, shortid.generate() + path.extname(file.originalname));
  }
});

const users = multer.diskStorage({
  // Set the destination
  destination: './public/uploads/users',
  // Set the filename
  filename: (req, file, setFilenameCallback) => {
    setFilenameCallback(null, shortid.generate() + path.extname(file.originalname));
  }
});

const tickets = multer.diskStorage({
  // Set the destination
  destination: './public/uploads/tickets',
  // Set the filename
  filename: (req, file, setFilenameCallback) => {
    setFilenameCallback(null, shortid.generate() + path.extname(file.originalname));
  }
});

module.exports = {
  categories,
  products,
  recipes,
  prizes,
  promos,
  users,
  tickets
}