
const CryptoJS = require('crypto-js');

const error = require('./error');

function hashInput(str) {
  return CryptoJS.SHA3(str, { outputLength: 64 }).toString();
}

function hashUsername(username){
  return hashInput('user:' + username);
}

function hashPassword(password){
  return hashInput('pass:' + password);
}

function generateApiKey(username, password){
  return `${hashUsername(username)}:${hashPassword(password)}`;
}

function parseApiKey(apiKey){
  const parts = apiKey.split(':');
  return {
    userHash: parts[0],
    passHash: parts[1],
  };
}

function encryptData(passHash, data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), passHash).toString();
}

function decryptData(passHash, encrypted) {
  if (!encrypted){
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(encrypted, passHash);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(decryptedString);
  } catch (e) {
    console.log(decryptedString);
    console.log(e);
    throw new error.IncorrectAuth();
  }
}

module.exports = {
  hashUsername,
  hashPassword,
  generateApiKey,
  parseApiKey,
  encryptData,
  decryptData,
};
