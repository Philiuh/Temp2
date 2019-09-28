import * as R from 'ramda'
import ENDPOINTS from '../../api'
import { handleStatuses } from '../../aspects'

export const getPosts = R.pipeP(
  token =>
    fetch(ENDPOINTS.POSTS, { headers: { authorization: `Bearer ${token}` } }),
  handleStatuses(),
  x => x.json(),
  R.prop('data'),
)

export const removePost = R.pipeP(
  (token, id) =>
    fetch(ENDPOINTS.getDeletePost(id), {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token}` },
    }),
  handleStatuses(),
)

export const savePost = R.pipeP(
  (token, data) =>
    fetch(ENDPOINTS.POSTS_CREATE, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: data,
    }),
  handleStatuses({ shouldParse400: true }),
)

export const updatePost = R.pipeP(
  (token, data) =>
    fetch(ENDPOINTS.POSTS_CREATE, {
      method: 'PUT',
      headers: { authorization: `Bearer ${token}` },
      body: data,
    }),
  handleStatuses({ shouldParse400: true }),
)
