const elementGenerators = require('./element-generators')
const dataTypes = require('@wmfs/tymly-data-types')

function elementGeneratorPicker (key, property, options) {
  const generatorName = elementGeneratorName(key, property, options)
  const generator = elementGenerators[generatorName]

  return generator || NullGenerator(key, generatorName)
}

function NullGenerator (key, generatorName) {
  return (key, generatorName) => {
    console.error(`FAILED TO MAP ${key} TO GENERATOR (Unable to find generator '${generatorName}')`)
    return []
  }
}

const typeToElement = {
  string: stringElementGeneratorName,
  integer: 'InputNumber',
  number: 'InputNumber',
  boolean: 'InputToggle',
  object: 'CardList'
}

const categoryToElement = {
  choice: 'InputChoiceSet'
}

function elementGeneratorName (key, property, options) {
  if (property.output) {
    return 'Output'
  }

  const element = dataTypeElement(property) || typeToElement[property.type]

  return (typeof element === 'function') ? element(property) : element
} // elementGeneratorName

function dataTypeElement (property) {
  const dataType = dataTypes.getDataTypeByName(property.typeHint)
  if (!dataType) {
    return null
  }

  const typeElement = typeToElement[property.typeHint]
  const categoryElement = categoryToElement[dataType.category]

  return typeElement || categoryElement
} // dataTypeElement

function stringElementGeneratorName (property) {
  if (property.enum) {
    return 'InputChoiceSet'
  }

  if (property.format) {
    switch (property.format) {
      case 'date-time':
        // TODO: Use example[0] to tweak to date / dateTime / time?
        return 'InputDateTime'
      case 'email':
        return 'InputEmail'
      default: // hostname, ipv4, ipv6, uri, uri-reference, json-pointer, uri-template, etc
        return 'InputText'
    }
  }

  return 'InputText'
} // stringElementGeneratorName

module.exports = elementGeneratorPicker
