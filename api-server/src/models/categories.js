'use strict';

const Q = require('../app.js');

const categoriesSchema = require('./categories-schema.js'); //new code, rename, check path
//the requirement for all the fields (properties)
//comes in with get, put, post, delete

class Categories {

  constructor() {

  }

  get(_id) {
    //is either a specific object or an EMPTY object (no key)
    let queryObject = _id ? {_id} : {};
    //find == get
    console.log('This is get path');
    Q.publish('databaseQueue','read', 'a read event happened');
    return categoriesSchema.find(queryObject);
  }
  
  post(record) {
    let newRecord = new categoriesSchema(record);
    console.log(newRecord); //should only have the properties
    console.log('This is post path');
    return newRecord.save();//actual post method

  }

  put(_id, record) {
    let queryObject = _id ? {_id} : {};
    console.log(queryObject); //continue here
    let newRecord = new categoriesSchema(record);
    console.log(newRecord);
    let updatedRecord = {queryObject, newRecord};
    console.log(`This shows the updatedRecord: ${updatedRecord}`);
    return newRecord.findOneAndUpdate(updatedRecord);

  }

  delete(_id) {
    
  }

}

module.exports = Categories;
