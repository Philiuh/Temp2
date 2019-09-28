import React from 'react'

import {
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
} from '@material-ui/core'
import FileInput from './FileInput'
import TagInput from './TagInput'
import TimePicker from './TimePicker/TimePicker'

export const TextInputField = ({
  input,
  meta: { touched, error },
  label,
  fullWidth,
  margin,
  ...rest
}) => (
  <FormControl error={touched && !!error} fullWidth={fullWidth} margin={margin}>
    <InputLabel>{label}</InputLabel>
    <Input {...input} {...rest} />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
)

export const FileField = ({
  input: { onChange },
  meta: { error },
  ...rest
}) => (
  <FormControl error={!!error}>
    <FileInput onChange={onChange} {...rest} />
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
)

export const TagInputField = ({
  input: { onChange, value },
  meta: { error },
  fullWidth,
  ...rest
}) => {
  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <TagInput
        onChange={onChange}
        tagsValue={value}
        fullWidth={fullWidth}
        {...rest}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export const DateInputField = ({ input, ...rest }) => (
  <TimePicker {...input} {...rest} />
)
