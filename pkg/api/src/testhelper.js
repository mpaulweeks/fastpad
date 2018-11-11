function toJSON(data){
  return JSON.stringify(data, Object.keys(data).sort());
}

module.exports = {
  toJSON,
};
