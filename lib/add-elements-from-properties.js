const _ = require('lodash')
const elementGeneratorPicker = require('./element-generator-picker')

module.exports = function addElementsFromProperties (root, targetArray, options) {
  if (!root.properties) return

  for (const [key, originalProperty] of Object.entries(root.properties)) {
    if (!originalProperty.type) continue

    let property = _.cloneDeep(originalProperty)

    // Sort multiple
    if (property.type === 'array') {
      property.multiple = true
      // Promote any item-level attributes to top-level
      property = _.defaults(property, property.items)
      property.type = property.items.type
      delete property.items
    } else {
      property.multiple = false
    }

    // Derive if required
    property.propertyRequired = isRequired(root, key)

    const elementGenerator = elementGeneratorPicker(key, property, options)
    const elements = elementGenerator(key, property, options)

    elements.forEach(element => {
      if (_.isObject(element.card)) {
        addElementsFromProperties(property, element.card.body, options)
      }
    })
    targetArray.push(...elements)
  }
}

function isRequired (root, key) {
  return root.required && root.required.indexOf(key) !== -1
}
