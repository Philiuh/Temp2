const validate = (nth, validator) => func => (req, res, next, ...args) => {
  if (nth <= 2) {
    return res
      .status(500)
      .json({ error: 'Validation nth arg must be grater then 2' })
  }

  const result = validator(args[nth - 3])
  if (result !== true) {
    return res.status(400).json(result)
  }

  func(req, res, next, ...args)
}

module.exports = { validate }
