const { promises: fs } = require('fs')
const R = require('ramda')

const removeUnusedFiles = R.pipeP(
  () => fs.readdir('files'),
  R.filter(R.test(/^[^.]+$/)),
  R.forEach(x => fs.unlink(`files/${x}`)),
)

module.exports = removeUnusedFiles
