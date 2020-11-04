const path = require('path');
const expHbs = require('express-handlebars');
const helpers = require('../utils/helpers');

const hbs = expHbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, "..", "views/layouts"),
  helpers: helpers
})

module.exports = hbs;