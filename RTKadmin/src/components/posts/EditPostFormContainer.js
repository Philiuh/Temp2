import { reduxForm } from 'redux-form'
import { FORMS } from '../../constants'
import * as R from 'ramda'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { updatePost, getSelectedItem } from '../../modules/posts'

const mapStateToProps = R.applySpec({
  initialValues: getSelectedItem,
})

const mapDispatchToProps = {
  savePost: updatePost,
}

const EditPostFormContainer = R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: FORMS.POST,
  }),
)(PostForm)

export default EditPostFormContainer
