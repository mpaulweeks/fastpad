'use strict'

// MASSIVE TODO this is placeholder from other project

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./auth');
const store = require('./store');

const app = express();
app.use(bodyParser.json()); // support json encoded POST bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes

app.post('/apikey', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(JSON.stringify({
    apikey: auth.generateApiKey(username, password),
  }));
});

app.get('/', (req, res) => {
  console.log(process.env.AWS_ACCESS_KEY_ID)
  console.log(process.env.AWS_SECRET_ACCESS_KEY)
  res.send(JSON.stringify({
    apikey: auth.generateApiKey('hello', 'world'),
  }));
});

module.exports = app;
