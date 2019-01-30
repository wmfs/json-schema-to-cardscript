/* eslint-env mocha */

'use strict'
const jsonSchemaToCardscript = require('../lib/index')

const chai = require('chai')
const expect = chai.expect

describe('Run some simple conversions', function () {
  const tests = [
    ['all fields', { }, 'pizza-form'],
    ['some fields', { fields: ['code', 'label', 'vegetarian'] }, 'some-fields-form']
  ]

  const pizzaModel = require('./fixtures/model/pizza')
  for (const [name, options, result] of tests) {
    const expectedForm = require(`./fixtures/expected/${result}`)

    options.schemaFilename = 'pizza.json'
    options.purpose = 'editing'
    options.modelName = 'pizza'

    it(name, () => {
      const cardscript = jsonSchemaToCardscript(
        pizzaModel,
        options
      )

      delete cardscript.meta.generatedOn

      expect(cardscript).to.eql(expectedForm)
    })
  }
})
