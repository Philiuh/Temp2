import { createExtendableBuiltin } from '../utils'

export class BadRequestError extends createExtendableBuiltin(Error) {
  constructor(message, errors) {
    super(message)
    this.errors = errors
    this.name = this.constructor.name
  }
}

export class ServerError extends createExtendableBuiltin(Error) {
  constructor(message, errors) {
    super(message)
    this.errors = errors
    this.name = this.constructor.name
  }
}
