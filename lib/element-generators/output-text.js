
module.exports = function outputElementGenerator (key, config, options) {
  const element = {
    type: 'FactSet',
    facts: [{
      title: config.title,
      value: `{{data.${key}}}`
    }]
  }

  return [element]
}
