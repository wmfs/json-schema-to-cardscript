module.exports = function sectionGenerator (key, config, options) {
  const elements = []
  const section = {
    type: 'Collapsible',
    title: key,
    card: {
      type: 'AdaptiveCard',
      body: []
    }
  }
  elements.push(section)
  return elements
}
