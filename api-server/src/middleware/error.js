'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Q = require('../app.js').Q;

module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  // Q.publish('filesQueue','error', {message: 'An error event happened'});
  res.end();
};