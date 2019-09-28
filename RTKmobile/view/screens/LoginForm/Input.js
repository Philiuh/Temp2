import React, { useState } from 'react'
import {TextInput } from 'react-native'
import styled from 'styled-components'

const Input = styled(TextInput)`
color: #ffffff;
border-bottom-width: 1px;
margin-bottom: 20px;
`
const FormInput = ({
    label,
    value,
    onChangeText,
    securePassword = false,
    errorUnderline,
  }) => {
    const [underlineColor, setUnderlineColor] = useState(
      'rgba(255, 255, 255, 0.3)',
    )
    const Focus = () => {
      setUnderlineColor('#8B00FF')
    }
    const Blur = () => {
      setUnderlineColor('rgba(255, 255, 255, 0.3)')
    }
  
    return (
      <Input
        placeholder={label}
        onChangeText={text => onChangeText(text)}
        value={value}
        secureTextEntry={securePassword}
        placeholderTextColor="rgba(255, 255, 255, 0.3)"
        onBlur={() => Blur()}
        onFocus={() => Focus()}
        style={
          errorUnderline && !value
            ? { borderBottomColor: '#FF3333' }
            : { borderBottomColor: underlineColor }
        }
      />
    )
  }

  export default FormInput