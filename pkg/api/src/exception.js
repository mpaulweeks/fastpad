
class InvalidApiKey extends Error {
  constructor(...props){
    super(...props);
    this.message = this.constructor.name;
    this.code = 400;
  }
}
class EmptyText extends Error {
  constructor(...props){
    super(...props);
    this.message = this.constructor.name;
    this.code = 400;
  }
}
class UserAlreadyExists extends Error {
  constructor(...props){
    super(...props);
    this.message = this.constructor.name;
    this.code = 400;
  }
}
class UserNotFound extends Error {
  constructor(...props){
    super(...props);
    this.message = this.constructor.name;
    this.code = 404;
  }
}
class NoteNotFound extends Error {
  constructor(...props){
    super(...props);
    this.message = this.constructor.name;
    this.code = 404;
  }
}
class IncorrectAuth extends Error {
  constructor(...props){
    super(...props);
    this.message = this.constructor.name;
    this.code = 403;
  }
}

module.exports = {
  InvalidApiKey,
  EmptyText,
  UserAlreadyExists,
  UserNotFound,
  NoteNotFound,
  IncorrectAuth,
};
