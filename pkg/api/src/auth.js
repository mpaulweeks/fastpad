

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
  return hash;
}

function hashUsername(username){
  return hashInput('user:' + hashInput);
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

module.exports = {
  hashUsername,
  hashPassword,
  generateApiKey,
  parseApiKey,
};
