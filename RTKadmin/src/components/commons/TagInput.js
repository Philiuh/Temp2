import React, { Fragment } from 'react'
import { TextField, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { withStateHandlers, withHandlers } from 'recompose'
import * as R from 'ramda'
import Close from '@material-ui/icons/Close'
import { passPropsTo } from '../../utils'

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.div`
  border-radius: 5px;
  background-color: #3f51b5;
  padding: 0 3px;
  margin: 2px;
  color: #fff;
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 5px;
  }
`

const TagText = styled(Typography)`
  color: #fff;
`

const RemoveTag = passPropsTo('onClick', 'tag')(styled(Close)`
  color: #fff;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  cursor: pointer;
`)

const TagInput = R.compose(
  withStateHandlers(
    { inputValue: '' },
    {
      onChangeInput: () => ({ target: { value } }) => ({ inputValue: value }),
      resetInputValue: () => () => ({ inputValue: '' }),
    },
  ),
  withHandlers({
    addTag: ({ onChange, inputValue, resetInputValue, tagsValue }) => ({
      key,
    }) => {
      if (key !== 'Enter') {
        return
      }
      onChange(R.uniq([...tagsValue, inputValue]))
      resetInputValue()
    },
    removeTag: ({ tagsValue, onChange }) => ({ tag }) =>
      onChange(R.reject(R.equals(tag), tagsValue)),
  }),
)(
  ({
    label,
    addTag,
    fullWidth,
    margin,
    onChangeInput,
    tagsValue,
    removeTag,
    inputValue,
  }) => (
    <Fragment>
      <TextField
        fullWidth={fullWidth}
        label={label}
        margin={margin}
        onKeyPress={addTag}
        onChange={onChangeInput}
        value={inputValue}
      />
      <TagsWrapper>
        {tagsValue.map(x => (
          <Tag key={x}>
            <TagText variant="body1">{x}</TagText>
            <RemoveTag tag={x} onClick={removeTag} />
          </Tag>
        ))}
      </TagsWrapper>
    </Fragment>
  ),
)

export default TagInput
