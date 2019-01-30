const processOptions = require('./process-options')
const jumbotronGenerator = require('./element-generators/jumbotron')
const addElementsFromProperties = require('./add-elements-from-properties')
const makeEmptySchema = require('./utils/make-empty-schema')

module.exports = function jsonSchemaToCardscript (jsonSchema, originalOptions) {
  const options = processOptions(jsonSchema, originalOptions)
  const cardscript = makeEmptySchema()

  // Add a Jumbotron header
  cardscript.body.push(...jumbotronGenerator(null, null, options))

  addElementsFromProperties(jsonSchema, cardscript.body, options)

  cardscript.meta = constructMeta(options)

  return cardscript
}

function constructMeta (options) {
  const meta = {
    generatedOn: new Date().toLocaleString()
  }

  if (options.generator) {
    meta.generatedWith = options.generator
  }
  if (options.modelName) {
    meta.data = {
      modelName: options.modelName
    }
  }

  return meta
}
