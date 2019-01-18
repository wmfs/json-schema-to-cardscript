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

  return cardscript
}
