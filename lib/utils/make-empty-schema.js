module.exports = function makeEmptySchema (options) {
  const schema = {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.0',
    type: 'AdaptiveCard',
    body: [],
    actions: []
  }

  if (!options || !options.viewOnly) {
    schema.actions.push({
      type: 'Action.Cancel',
      title: 'Cancel'
    }, {
      type: 'Action.Submit',
      title: 'Submit'
    })
  } else {
    schema.actions.push({
      type: 'Action.Cancel',
      title: 'Close'
    })
  }

  return schema
}
