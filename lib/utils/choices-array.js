const _ = require('lodash')

function choicesToChoiceArray (choices) {
  return choices
    .map(choice => {
      const [value, title] = Array.isArray(choice)
        ? choice
        : [choice, _.isString(choice) ? _.startCase(choice) : choice]

      return {
        title,
        value
      }
    })
} // choicesToChoiceArray

module.exports = choicesToChoiceArray
