

function hashInput(str) {
  // https://stackoverflow.com/a/8831937/6461842
  var hash = 0;
  if (!str || str.length === 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString();
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

const todoEncryptor = '!!!!!!!!!!!';

function encryptData(passHash, data) {
  return todoEncryptor + JSON.stringify(data);
}

function decryptData(passHash, encrypted) {
  if (!encrypted){
    return null;
  }
  const decrypted = encrypted.split(todoEncryptor)[1];
  try {
    return JSON.parse(encrypted);
  } catch (e) {
    console.log(e);
    throw new Exception('wrong password');
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
