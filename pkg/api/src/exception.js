
class UserNotFound extends Error {
  constructor(...props){
    super(...props);
    this.code = 403;
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
  UserNotFound,
  NoteNotFound,
  IncorrectAuth,
};
