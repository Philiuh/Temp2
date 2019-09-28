import React, { Component } from 'react'
import Datetime from 'react-datetime'
import { FormControl } from '@material-ui/core'
import './TimePicker.css'

class TimePicker extends Component {
  render() {
    return (
      <FormControl>
        <Datetime
          inputProps={{ placeholder: this.props.label }}
          // utc
          onChange={this._handleChange}
          value={this.props.value * 1000 || undefined}
        />
      </FormControl>
    )
  }

  _handleChange = e => {
    e.unix && this.props.onChange(e.unix())
  }
}

export default TimePicker
