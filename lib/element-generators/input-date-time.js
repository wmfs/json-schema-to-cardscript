const makeBaseElement = require('../utils/make-base-element')
const addDescriptions = require('../utils/add-descriptions')

module.exports = function inputDateTimeElementGenerator (key, config, options) {
  const elements = []
  const numberElement = makeBaseElement(key, 'Input.DateTime', config)
  // TODO: No title support?
  addDescriptions(numberElement, config)
  if (config.showWhen) {
    numberElement.showWhen = config.showWhen
  }
  elements.push(numberElement)
  return elements
}
