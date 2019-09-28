import React from 'react'
import {
  Modal,
  Paper,
  Typography,
  Button,
  TableSortLabel,
} from '@material-ui/core'
import styled from 'styled-components'
import {
  ButtonRemove as Close,
  TextInputField,
  FileField,
  TagInputField,
  DateInputField,
} from '../commons'
import { Field } from 'redux-form'

const FormModal = styled(Modal)`
  display: flex;
`

const FormPaper = styled(Paper)`
  width: 500px;
  margin: auto;
  padding: 40px;
  padding-bottom: 140px;
`

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -40px -40px 0 0;
`

const Save = styled(Button)`
  margin-top: 16px;
  float: right;
`

const PostForm = ({ onClose, handleSubmit, submitting, savePost, ...rest }) => (
  <FormModal open={true}>
    <FormPaper>
      <CloseWrapper>
        <Close onClick={onClose} />
      </CloseWrapper>

      <Typography variant="headline">Добавить подкаст</Typography>
      <Field
        name="title"
        fullWidth
        label="Заголовок"
        margin="dense"
        component={TextInputField}
      />
      <Field
        name="file"
        title="Выберите подкаст"
        accept=".mp3"
        component={FileField}
        fileType="audio"
      />
      <Field
        name="image"
        title="Выберите изображение"
        accept="image/*"
        component={FileField}
      />
      <Field
        name="tags"
        component={TagInputField}
        fullWidth
        label="Добавить тэг"
        margin="normal"
      />
      <Field
        name="time"
        component={DateInputField}
        label="Время отложенной публикации"
      />
      <Save
        disabled={submitting}
        variant="contained"
        color="primary"
        onClick={handleSubmit(savePost)}
      >
        Сохранить
      </Save>
    </FormPaper>
  </FormModal>
)

export default PostForm
