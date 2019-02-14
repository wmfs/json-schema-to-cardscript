module.exports = function jumbotronElementGenerator (key, config, options) {
  const jumbotronElement = {
    type: 'Jumbotron',
    title: options.cardscriptTitle,
    subtitle: options.cardscriptSubTitle
  }
  return [ jumbotronElement ]
}
