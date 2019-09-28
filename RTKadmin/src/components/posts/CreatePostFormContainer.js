import { reduxForm } from 'redux-form'
import { FORMS } from '../../constants'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { createPost } from '../../modules/posts'

const mapDispatchToProps = {
  savePost: createPost,
}

const CreatePostFormContainer = R.compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  reduxForm({
    form: FORMS.POST,
    initialValues: { tags: [] },
  }),
)(PostForm)

export default CreatePostFormContainer
