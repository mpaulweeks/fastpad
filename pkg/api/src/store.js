'use strict'

const AWS = require('aws-sdk');

const exception = require('./exception');
const auth = require('./auth');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

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
    new AWS.S3().getObject({
      ...s3BaseConfig,
      Key: `data/${userHash}.json`,
    }, (error, data) => {
      if (error != null) {
        reject(new exception.UserNotFound());
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
  return auth.decryptData(passHash, encrypted);
}

async function saveUser(apikey, data){
  const { userHash, passHash } = auth.parseApiKey(apikey);
  const encrypted = auth.encryptData(passHash, data);
  return new Promise((resolve, reject) => {
    new AWS.S3().putObject({
      ...s3BaseConfig,
      Key: `data/${userHash}.json`,
      Body: encrypted,
    }, (error, data) => {
      if (error != null) {
        console.log(error);
        reject(new exception.UserNotFound());
      } else {
        resolve();
      }
    });
  });
}

async function checkUsername(username) {
  const userHash = auth.hashUsername(username);
  await loadUserRaw(userHash);
  return true;
}

async function createUser(username, password) {
  try {
    await checkUsername(username)
  } catch (e) {
    if (e instanceof exception.UserNotFound) {
      const apikey = auth.generateApiKey(username, password);
      const { userHash } = auth.parseApiKey(apikey);
      const newUser = {
        userHash: userHash,
        created: getNow(),
        notes: [],
      };
      await saveUser(apikey, newUser);
      return newUser;
    }
  }
  throw new exception.UserAlreadyExists(username);
}

async function getNotes(apikey) {
  const user = await loadUser(apikey);
  return user.notes;
}

async function addNote(apikey, text) {
  if (!text) {
    throw new exception.EmptyText();
  }
  const user = await loadUser(apikey);
  const newNote = {
    id: newId(),
    text: text,
    created: getNow(),
    updated: getNow(),
  };
  user.notes.push(newNote);
  const success = await saveUser(apikey, user);
  return newNote;
}

async function upsertNote(apikey, id, text, created) {
  if (!text) {
    throw new exception.EmptyText();
  }
  const user = await loadUser(apikey);
  const existingNote = user.notes.filter(note => note.id === id)[0] || {
    created: getNow(),
  };
  const upsertNote = {
    id: id,
    text: text,
    created: created || existingNote.created,
    updated: getNow(),
  };
  const newNotes = user.notes.filter(note => note.id !== id).concat(upsertNote);
  user.notes = newNotes;
  const success = await saveUser(apikey, user);
  return upsertNote;
}

async function deleteNote(apikey, id) {
  const user = await loadUser(apikey);
  const newNotes = user.notes.filter(note => note.id !== id);
  user.notes = newNotes;
  const success = await saveUser(apikey, user);
  return newNotes;
}

async function changePassword(apikey, newPassword) {
  const user = await loadUser(apikey);
  const newKey = auth.changePassword(apikey, newPassword);
  const success = await saveUser(newKey, user);
  return newKey;
}

module.exports = {
  checkUsername,
  createUser,
  getNotes,
  addNote,
  upsertNote,
  deleteNote,
  changePassword,
};
