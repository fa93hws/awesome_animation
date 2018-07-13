const config = require('./webpack.base');
const path = require('path');

config.mode = 'development';
config.watch = true;
config.devServer = {
  contentBase: path.join(__dirname, "./dist/"),
  port: 3000
};

module.exports = config;