import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import { lifecycle, withHandlers, withState } from 'recompose'

import {
  PostsList,
  CreatePostFormContainer,
  EditPostFormContainer,
} from '../components/posts'
import { Grid } from '@material-ui/core'

import { AppBar } from '../components/commons'

const ListGridItem = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  padding-top: 56px;
`

const PostsScreen = R.compose(
  lifecycle({
    componentDidMount() {
      this.props.requestPosts()
    },
  }),
  withState('isModalOpenEdit', 'showUpdateModal', false),
  withState('isModalOpenCreate', 'showCreateModal', false),
  withHandlers({
    toggleCreateModal: ({ showCreateModal, isModalOpenCreate }) => () =>
      showCreateModal(!isModalOpenCreate),
    toggleUpdateModal: ({ showUpdateModal, isModalOpenEdit }) => () =>
      showUpdateModal(!isModalOpenEdit),
  }),
)(
  ({
    posts,
    removePost,
    isModalOpenEdit,
    isModalOpenCreate,
    toggleCreateModal,
    toggleUpdateModal,
    selectPost,
  }) => (
    <Grid container>
      <Grid item xs={12}>
        <AppBar
          position="fixed"
          buttons={[{ name: 'Создать пост', handler: toggleCreateModal }]}
        />
      </Grid>
      <ListGridItem>
        {isModalOpenCreate && (
          <CreatePostFormContainer onClose={toggleCreateModal} />
        )}
        {isModalOpenEdit && (
          <EditPostFormContainer onClose={toggleUpdateModal} />
        )}
        <PostsList
          selectPost={selectPost}
          openUpdateModal={toggleUpdateModal}
          posts={posts}
          removePost={removePost}
        />
      </ListGridItem>
    </Grid>
  ),
)

export default PostsScreen
