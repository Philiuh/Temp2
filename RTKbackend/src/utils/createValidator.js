const R = require('ramda')

const createValidator = R.pipe(
  R.mapObjIndexed((x, key) =>
    R.pipe(
      R.map(R.adjust(m => R.always({ [key]: m }), 1)),
      R.append([R.T, R.always({})]),
      x =>
        R.pipe(
          R.prop(key),
          R.cond(x),
        ),
    )(x),
  ),
  R.values,
  R.converge(
    R.pipe(
      R.unapply(R.mergeAll),
      R.when(R.isEmpty, R.always(true)),
    ),
  ),
)

module.exports = createValidator
