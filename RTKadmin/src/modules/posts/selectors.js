import * as R from 'ramda'

const getPosts = R.prop('posts')

export const getItems = R.pipe(
  getPosts,
  R.prop('items'),
)

export const getSelectedItem = R.converge(
  (all, selected) => R.find(R.propEq('id', selected), all),
  [
    getItems,
    R.pipe(
      getPosts,
      R.prop('selectedPost'),
    ),
  ],
)
