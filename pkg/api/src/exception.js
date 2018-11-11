
class InvalidApiKey extends Error {
  constructor(...props){
    super(...props);
    this.code = 400;
  }
}
class UserAlreadyExists extends Error {
  constructor(...props){
    super(...props);
    this.code = 400;
  }
}
class UserNotFound extends Error {
  constructor(...props){
    super(...props);
    this.code = 404;
  }
}
class NoteNotFound extends Error {
  constructor(...props){
    super(...props);
    this.code = 404;
  }
}
class IncorrectAuth extends Error {
  constructor(...props){
    super(...props);
    this.code = 403;
  }
}

module.exports = {
  InvalidApiKey,
  UserNotFound,
  NoteNotFound,
  IncorrectAuth,
};
