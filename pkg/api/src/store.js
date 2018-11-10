'use strict'

// MASSIVE TODO this is placeholder from other project

const AWS = require('aws-sdk');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
console.log(process.env.AWS_ACCESS_KEY_ID)
console.log(process.env.AWS_SECRET_ACCESS_KEY)

const s3 = new AWS.S3();
const s3Config = {
  Bucket: 'mpaulweeks-redirect',
  Key: 'links.json',
}

function getIndex() {
  // https://s3.amazonaws.com/mpaulweeks-redirect/fe/index.html
  return new Promise((resolve, reject) => {
    s3.getObject({
      ...s3Config,
      Key: 'fe/index.html',
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to retrieve an object: ' + error);
        reject(error);
      } else {
        const index = data.Body.toString();
        resolve(index);
      }
    });
  });
}

function getLinks() {
  // https://s3.amazonaws.com/mpaulweeks-redirect/links.json
  return new Promise((resolve, reject) => {
    s3.getObject({
      ...s3Config,
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to retrieve an object: ' + error);
        reject(error);
      } else {
        const links = JSON.parse(data.Body.toString());
        resolve(links);
      }
    });
  });
}

function putLinks(links) {
  // https://s3.amazonaws.com/mpaulweeks-redirect/links.json
  return new Promise((resolve, reject) => {
    s3.putObject({
      ...s3Config,
      Body: JSON.stringify(links, null, 2),
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to put an object: ' + error);
        reject(error);
      } else {
        resolve(links);
      }
    });
  });
}

module.exports = {
  getIndex,
  getLinks,
  putLinks,
};
