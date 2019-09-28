import React from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { withStateHandlers, withHandlers } from 'recompose'
import * as R from 'ramda'

const Input = styled.input.attrs({ type: 'file' })`
  display: none;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InputButton = styled(Button)`
  margin-left: 10px;
`

const TitleText = styled.p``

const FileInput = R.compose(
  withStateHandlers(
    { currentFile: '' },
    { setCurrentFile: () => currentFile => ({ currentFile }) },
  ),
  withHandlers({
    handleChange: ({ setCurrentFile, onChange }) => ({
      nativeEvent: { target },
    }) => {
      setCurrentFile(target.files[0].name)
      onChange && onChange(target.files[0])
    },
  }),
)(
  ({
    className,
    currentFile,
    handleChange,
    accept,
    title = 'Выберите файл',
    withPreview,
    fileType,
    value,
  }) => (
    <Container>
      <TitleText>{title}:</TitleText>
      <InputButton className={className} variant="contained" component="label">
        <Input onChange={handleChange} accept={accept} />
        {currentFile || 'Добавить файл'}
      </InputButton>
    </Container>
  ),
)

export default FileInput
