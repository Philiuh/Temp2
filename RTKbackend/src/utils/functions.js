const R = require('ramda')

const getFileExtension = R.pipe(
  R.split('.'),
  R.last,
)

const prodOrDev = (ifProd, ifDev) =>
  R.ifElse(
    () => process.env.NODE_ENV === 'production',
    typeof ifProd === 'function' ? ifProd : () => ifProd,
    typeof ifDev === 'function' ? ifDev : () => ifDev,
  )()

module.exports = { getFileExtension, prodOrDev }
