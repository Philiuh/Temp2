const R = require('ramda')

const provideBody = func => (...args) => func(...args, args[0].body)
const provideFile = func => (...args) => func(...args, args[0].file)
const provideParams = func => (...args) => func(...args, args[0].params)
const provide = (...names) => func => (...args) =>
  func(...args, ...R.props(names, args[0]))

module.exports = {
  provideBody,
  provideFile,
  provideParams,
  provide,
}
