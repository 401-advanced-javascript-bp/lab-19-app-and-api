'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

//make a json object representing your data
//then wrap it in mongoose.Schema()
const categories = mongoose.Schema({
  name: {type: String, required: true},
});

//wrap your schema and name it
module.exports = mongoose.model('categories', categories);