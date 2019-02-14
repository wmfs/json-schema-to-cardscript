const _ = require('lodash')
const dataTypes = require('@wmfs/tymly-data-types')

const makeBaseElement = require('../utils/make-base-element')

function choiceSetElementGenerator (key, config, options) {
  const choiceSetElement = makeBaseElement(key, 'Input.ChoiceSet', config)
  choiceSetElement.choices = []

  const choices = config.enum || dataTypeChoices(config.typeHint)

  choiceSetElement.choices = choices
    .map(choice => {
      const [value, title] = Array.isArray(choice)
        ? choice
        : [choice, _.isString(choice) ? _.startCase(choice) : choice]

      return {
        title,
        value
      }
    })

  if (config.type === 'array') {
    choiceSetElement.isMultiSelect = true
  }

  return [ choiceSetElement ]
} // choiceSetElementGenerator

function dataTypeChoices (typeHint) {
  const dataType = dataTypes.getDataTypeByName(typeHint)
  return Object.entries(dataType.choiceSet)
} // dateTypeChoices

module.exports = choiceSetElementGenerator
