'use strict'

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
app.use(function (err, req, res, next) {
  if (err.code) {
    res.status(err.code);
  } else {
    res.status(500);
  }
  res.render('error', { error: err })
});

// apikey routes

app.get('/notes', (req, res) => {
  const apikey = req.get('apikey');
  res.send(JSON.stringify({
    notes: store.getNotes(apikey),
  }));
});
app.post('/notes', (req, res) => {
  const apikey = req.get('apikey');
  const { text } = req.body;
  res.send(JSON.stringify({
    result: store.addNote(apikey, text),
  }));
});
app.patch('/notes/:id', (req, res) => {
  const apikey = req.get('apikey');
  const { id } = req.params;
  const newNote = {
    text: req.body.text,
  };
  res.send(JSON.stringify({
    result: store.updateNote(apikey, id, newNote),
  }));
});
app.delete('/notes/:id', (req, res) => {
  const apikey = req.get('apikey');
  const { id } = req.params;
  res.send(JSON.stringify({
    notes: store.deleteNote(apikey, id),
  }));
});
app.put('/password', (req, res) => {
  const apikey = req.get('apikey');
  const password = req.body.password;
  res.send(JSON.stringify({
    apikey: auth.changePassword(apikey, password),
  }));
});

// anonymous routes

app.post('/user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(JSON.stringify({
    result: auth.createUser(username, password),
  }));
});
app.post('/apikey', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(JSON.stringify({
    apikey: auth.generateApiKey(username, password),
  }));
});
app.get('/check', (req, res) => {
  const username = req.body.username;
  store.checkUsername(username);
  res.status(200);
});

// root

app.get('/', (req, res) => {
  res.send(JSON.stringify({
    access: process.env.AWS_ACCESS_KEY_ID,
    apikey: auth.generateApiKey('hello', 'world'),
  }));
});

module.exports = app;
