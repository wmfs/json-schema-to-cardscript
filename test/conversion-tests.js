/* eslint-env mocha */

'use strict'
const jsonSchemaToCardscript = require('../lib/index')
const pizzaModel = require('./fixtures/model/pizza')
const expectedForm = require('./fixtures/expected/pizza-form.json')

const chai = require('chai')
const expect = chai.expect

describe('Run some simple conversions', function () {
  it('Convert pizza model', function () {
    const cardscript = jsonSchemaToCardscript(
      pizzaModel,
      {
        schemaFilename: 'pizza.json',
        purpose: 'editing'
      }
    )

    expect(cardscript).to.eql(expectedForm)
  })
})
