
const CryptoJS = require('crypto-js');

const exception = require('./exception');

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

function parseApiKey(apikey){
  const parts = apikey.split(':');
  if (parts.length !== 2){
    throw new exception.InvalidApiKey(apikey);
  }
  return {
    userHash: parts[0],
    passHash: parts[1],
  };
}

function encryptData(passHash, data) {
  if (!passHash){
    throw new exception.InvalidApiKey();
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), passHash).toString();
}

function decryptData(passHash, encrypted) {
  if (!encrypted){
    return null;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, passHash);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (e) {
    throw new exception.IncorrectAuth();
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
