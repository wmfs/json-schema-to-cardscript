module.exports = function makeBaseElement (key, type, config) {
  return {
    id: key,
    type,
    title: config.title
  }
}
