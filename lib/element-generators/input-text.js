const makeBaseElement = require('../utils/make-base-element')
const addDescriptions = require('../utils/add-descriptions')

module.exports = function inputTextElementGenerator (key, config, options) {
  const elements = []
  const textElement = makeBaseElement(key, 'Input.Text', config)

  addDescriptions(textElement, config)
  if (config.showWhen) {
    textElement.showWhen = config.showWhen
  }

  elements.push(textElement)
  return elements
}
