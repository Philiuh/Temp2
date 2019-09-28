const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
}

const handle = method => url => middlewares => router =>
  Array.isArray(middlewares)
    ? router[method](url, ...middlewares)
    : router[method](url, middlewares)

const handleGet = handle(METHODS.GET)
const handlePost = handle(METHODS.POST)
const handlePut = handle(METHODS.PUT)
const handleDelete = handle(METHODS.DELETE)

const addMiddleware = middleware => middlewares =>
  Array.isArray(middlewares)
    ? [middleware, ...middlewares]
    : [middleware, middlewares]

module.exports = {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  addMiddleware,
}
