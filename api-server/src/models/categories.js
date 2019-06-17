'use strict';
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
const Qbert = require('@nmq/q/client');

const categoriesSchema = require('./categories-schema.js'); //new code, rename, check path
//the requirement for all the fields (properties)
//comes in with get, put, post, delete

class Categories {

  constructor(schema) {
    this.schema = categoriesSchema;
  }

  get(_id) {
    //is either a specific object or an EMPTY object (no key)
    //if id exist, yes, then do first item, if not, then do second item after colon
    let queryObject = _id ? {'_id' : _id} : {};
    //find == get
    console.log('This is get path');
    Qbert.publish('databaseQueue','read', {message: 'a read event happened'});
    //console.log('this is schema.find with queryObject', this.schema.find(queryObject));
  
    return this.schema.find(queryObject);
  }
  
  post(record) {
    let newRecord = new this.schema(record);
    console.log(newRecord); //should only have the properties
    console.log('This is a post path from the categories.js file');
    Qbert.publish('databaseQueue','create', {message: 'a create event happened'});
    return newRecord.save();//actual post method

  }

  put(_id, record) {
    // let queryObject = _id ? {_id} : {};
    // console.log(queryObject); //continue here
    // let newRecord = new this.schema(record);
    // console.log(newRecord);
    // let updatedRecord = {queryObject, newRecord};
    // console.log(`This shows the updatedRecord: ${updatedRecord}`);
    // return newRecord.findOneAndUpdate(updatedRecord);
    Qbert.publish('databaseQueue','update', {message: 'an update event happened'});
    return this.schema.findByIdAndUpdate(_id, record, {new : true});
  }
  /*
    put(_id, record){
    return this.schema.findByIdAndUpdate(_id, record, {new : true});
  }
  */

  delete(_id) {
    Qbert.publish('databaseQueue','delete', {message: 'a delete event happened'});
    // Q.publish('filesQueue','delete', 'a delete event happened');
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Categories;
