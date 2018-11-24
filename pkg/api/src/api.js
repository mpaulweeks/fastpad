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

// assume every request returns promise

function wrap(genFn) {
  return function (req, res, next) {
    return genFn(req, res, next).catch(next);
  }
}

// apikey routes

app.get('/notes', wrap((req, res) => {
  const apikey = req.get('apikey');
  return store.getNotes(apikey).then(result => {
    res.send(JSON.stringify({
      notes: result,
    }));
  });
}));
app.post('/notes', wrap((req, res) => {
  const apikey = req.get('apikey');
  const text = req.body.text;
  return store.addNote(apikey, text).then(note => {
    res.send(JSON.stringify({
      note: note,
    }));
  });
}));
app.patch('/notes/:id', wrap((req, res) => {
  const apikey = req.get('apikey');
  const id = parseFloat(req.params.id);
  const text = req.body.text;
  return store.updateNote(apikey, id, text).then(note => {
    res.send(JSON.stringify({
      note: note,
    }));
  });
}));
app.delete('/notes/:id', wrap((req, res) => {
  const apikey = req.get('apikey');
  const id = parseFloat(req.params.id);
  return store.deleteNote(apikey, id).then(result => {
    res.send(JSON.stringify({
      deleted: id,
    }));
  });
}));
app.put('/password', wrap((req, res) => {
  const apikey = req.get('apikey');
  const password = req.body.password;
  res.send(JSON.stringify({
    apikey: auth.changePassword(apikey, password),
  }));
}));

// anonymous routes

app.post('/user', wrap((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  return store.createUser(username, password).then(result => {
    res.send(JSON.stringify({
      result: result,
    }));
  });
}));
app.post('/apikey', wrap((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(JSON.stringify({
    apikey: auth.generateApiKey(username, password),
  }));
}));
app.get('/check', wrap((req, res) => {
  const username = req.body.username;
  return store.checkUsername(username).then(result => {
    res.status(204);
  });
}));

// root

app.get('/', wrap((req, res) => {
  res.send(JSON.stringify({
    access: process.env.AWS_ACCESS_KEY_ID,
    apikey: auth.generateApiKey('hello', 'world'),
  }));
}));

// handle errors

app.use(function (err, req, res, next) {
  console.log(req.originalUrl);
  if (err.code) {
    res.status(err.code);
  } else {
    res.status(500);
  }
  next(err);
});

module.exports = app;
