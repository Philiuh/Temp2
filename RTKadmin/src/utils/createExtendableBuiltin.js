const createExtendableBuiltin = cls => {
  function ExtendableBuiltin() {
    cls.apply(this, arguments)
  }
  ExtendableBuiltin.prototype = Object.create(cls.prototype)

  return ExtendableBuiltin
}

export default createExtendableBuiltin
