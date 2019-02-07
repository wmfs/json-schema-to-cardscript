const _ = require('lodash')

const TITLE_SUFFIXES = {
  'editing': 'Editor',
  'creating': 'Maker'
}

module.exports = function processOptions (jsonSchema, originalOptions) {
  let options = _.cloneDeep(originalOptions || {})
  options = _.defaults(
    options,
    {
      purpose: 'editing',
      schemaFilename: 'unknown.json',
      schemaTitle: jsonSchema.title,
      schemaDescription: jsonSchema.description
    }
  )

  if (!options.fields) {
    options.fields = Object.keys(jsonSchema.properties)
  }

  // Stripped filename (useful if no title/description provided)
  // 'some-thing.json' => 'some thing'
  // 'someThing/json' => 'some thing'
  options.strippedFilename = options.schemaFilename.split('.')[0]
  options.strippedFilename = _.kebabCase(options.strippedFilename)
  options.strippedFilename = options.strippedFilename.replace(/-/g, ' ')

  if (!options.title) {
    options.simpleTitle = options.schemaTitle || _.upperFirst(options.strippedFilename)
    options.cardscriptTitle = `${options.simpleTitle} ${TITLE_SUFFIXES[options.purpose]}`
  }

  options.viewOnly = Object.entries(jsonSchema.properties)
    .filter(([k, v]) => options.fields.includes(k))
    .map(([k, v]) => v.output)
    .filter(t => !t)
    .length === 0

  return options
}
