const dataTypes = require('@wmfs/tymly-data-types')
const enumToChoiceArray = require('../utils/choices-array')
const makeBaseElement = require('../utils/make-base-element')

function choiceSetElementGenerator (key, config, options) {
  const choiceSetElement = makeBaseElement(key, 'Input.ChoiceSet', config)
  choiceSetElement.choices = []

  const choices = config.enum || config.items || dataTypeChoices(config.typeHint)

  if (choices.enum) {
    choiceSetElement.choices = enumToChoiceArray(choices.enum)
  } else {
    choiceSetElement.choices = enumToChoiceArray(choices)
  }

  if (config.type === 'array') {
    choiceSetElement.isMultiSelect = true
  }

  if (choiceSetElement.choices.length < 3 && choices.enum) {
    choiceSetElement.style = 'expanded'
  }

  if (config.showWhen) {
    choiceSetElement.showWhen = config.showWhen
  }
  return [choiceSetElement]
} // choiceSetElementGenerator

function dataTypeChoices (typeHint) {
  const dataType = dataTypes.getDataTypeByName(typeHint)
  return Object.entries(dataType.choiceSet)
} // dateTypeChoices

module.exports = choiceSetElementGenerator
