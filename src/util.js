module.exports.parseName = function parseName(name) {
  return name.indexOf('#') == 0 ? name.substring(2, name.length) : name;
}
