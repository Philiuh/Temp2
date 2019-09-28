import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  getItems,
  requestPosts,
  removePost,
  selectPost,
} from '../modules/posts'

import PostsScreen from './PostsScreen'

const mapStateToProps = R.applySpec({
  posts: getItems,
})

const mapDispatchToProps = {
  requestPosts,
  removePost,
  selectPost,
}

const PostsScreenContainer = R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PostsScreen)

export default PostsScreenContainer
