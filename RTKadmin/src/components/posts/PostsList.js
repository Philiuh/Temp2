import React from 'react'
import * as R from 'ramda'
import { withHandlers, withState, withProps } from 'recompose'

import PostItem from './PostItem'
import { BaseTable } from '../commons'
import { Player } from '../../services'

const PostsList = R.compose(
  withState('currentTrack', 'setCurrentTrack', null),
  withHandlers({
    togglePlay: ({ currentTrack, setCurrentTrack, posts }) => postId => {
      if (currentTrack !== postId || Player.paused) {
        const { url } = posts.find(({ id }) => id === postId)
        if (Player.src !== url) {
          Player.src = url
        }
        Player.play()
        setCurrentTrack(postId)
      } else {
        Player.pause()
        setCurrentTrack(null)
      }
    },
    onUpdatePress: ({ selectPost, openUpdateModal }) => id => {
      selectPost(id)
      openUpdateModal()
    },
  }),
  withProps(
    ({ posts, togglePlay, currentTrack, removePost, onUpdatePress }) => ({
      rows: posts.map(post => (
        <PostItem
          {...post}
          key={post.id}
          onPlay={togglePlay}
          isPlaying={currentTrack === post.id}
          onRemove={removePost}
          onUpdatePress={onUpdatePress}
        />
      )),
    }),
  ),
)(({ rows }) => (
  <BaseTable
    headerNames={[
      { name: 'id' },
      { name: 'Название' },
      { name: 'Проигрыватель' },
      { name: ' Тэги' },
      { name: 'Изображение' },
      { name: '' },
      { name: '' },
    ]}
    rows={rows}
  />
))

export default PostsList
