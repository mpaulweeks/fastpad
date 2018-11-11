'use strict'

// MASSIVE TODO this is placeholder from other project

const AWS = require('aws-sdk');

const error = require('./error');
const auth = require('./auth');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
console.log(process.env.AWS_ACCESS_KEY_ID)
console.log(process.env.AWS_SECRET_ACCESS_KEY)

const s3 = new AWS.S3();
const s3BaseConfig = {
  Bucket: 'fastpad',
}

function newId() {
  return new Date().getTime();
}

function getNow() {
  return new Date().toISOString();
}

function loadUserRaw(userHash){
  return new Promise((resolve, reject) => {
    s3.getObject({
      ...s3Config,
      Key: `data/${userHash}.json`,
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to retrieve an object: ' + error);
        resolve(new error.UserNotFound());
      } else {
        const rawData = data.Body.toString();
        resolve(rawData);
      }
    });
  });
}

async function loadUser(apikey){
  const { userHash, passHash } = auth.parseApiKey(apikey);
  const encrypted = await loadUserRaw(userHash);
  const data = auth.decryptData(passHash, encrypted);
  return {
    exists: !!data,
    data: {
      notes: [],
      ...data,
    },
  };
}

async function saveUser(apikey, data){
  const { userHash, passHash } = auth.parseApiKey(apikey);
  const encrypted = auth.encryptData(passHash, data);
  return new Promise((resolve, reject) => {
    s3.putObject({
      ...s3Config,
      Body: encrypted,
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to put an object: ' + error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function checkUsername(username) {
  const userHash = hashUsername(username);
  await loadUserRaw(userHash);
  return true;
}

async function getNotes(apikey) {
  const user = await loadUser(apikey);
  return user.data.notes;
}

async function addNote(apikey, text) {
  const user = await loadUser(apikey);
  const { data } = user;
  const newNote = {
    id: newId(),
    text: text,
    created: getNow(),
    updated: getNow(),
  };
  data.notes.push(newNote);
  const success = await saveUser(apikey, data);
  return newNote;
}

async function updateNote(apikey, id, text) {
  const user = await loadUser(apikey);
  const { data } = user;
  let newNote;
  data.notes.forEach((note, index) => {
    if (note.id = id) {
      newNote = {
        ...note,
        text: text,
        updated: getNow(),
      };
      data.notes[index] = newNote;
    }
  });
  if (newNote){
    const success = await saveUser(apikey, data);
    return newNote;
  } else {
    throw new error.NoteNotFound();
  }
}

module.exports = {
  checkUsername,
  getNotes,
  addNote,
  updateNote,
};
