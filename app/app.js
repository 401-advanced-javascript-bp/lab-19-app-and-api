'use strict';
const socketIOClient = require('socket.io-client');
const Q = require('@nmq/q/client');
const constants = require('../utils/constants');
const events = require('../utils/events');
//this is where transform.js is connected to server.js
const appSocket = socketIOClient.connect(constants.SERVER_URL);
const util = require('util');

const fs = require('fs'); //delete?

const filesQ = new Q('filesQ');

const dbQ = new Q('databaseQ'); //db Queue

const handleRead = (fileName) => {
  // console.log('handleRead');
  const read = util.promisify(fs.readFile);
  read(fileName)
    .then((fileContents) => {
      return new Buffer(fileContents.toString().toUpperCase());
    })
    .then((buffer) => {
      const write = util.promisify(fs.writeFile);
      write(fileName, buffer);
    })
    .then(() => {
      //first parameter is the files Queue, save is the event, third message is a message or object or number providing info back to the server
      //think of Queues as rooms, they track events
      clientQ.publish('files', 'save', 'This file was modified and saved.');
    })
    .catch((error) => {
      //'files' is the name of the Queue, monitors errors and saves
      //clientQ.publish('files', 'error', {error});
      // console.log(error);
    });
};

let file = process.argv.slice(2).shift();
handleRead(file);

filesQ.publish('filesQ', 'save', {});
filesQ.publish('filesQ', 'error', {});

