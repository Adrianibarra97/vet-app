import { ChangeEvent, useState } from 'react'
import { FormControl, Box, Typography, TextField } from '@mui/material'
import { formControl, formControlNone, helpText, textField } from './FormControlModalStyle'

interface FromControlModalProps {
  isActive: boolean
  errorActive: boolean
  label: string
  defaultValue: string | number
  type: 'text' | 'number' | 'password'
  labelColor: 'success' | 'error'
  handleInputChanges(value: string | number): void
}

export const FormControlModal = (formControlProps: FromControlModalProps) => {

  const [value, setValue] = useState(formControlProps.defaultValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue: string | number = e.target.value
    formControlProps.handleInputChanges(newValue)
    setValue(newValue)
  }

  const formHelperText = () => {
    return !value && formControlProps.errorActive
      ? (<Box sx={ helpText }><Typography color="red">Campo obligatorio</Typography></Box>)
      : ('')
  }

  return (
    <FormControl sx={ formControlProps.isActive ? formControl : formControlNone }>
      <TextField
        sx={ textField } type={ formControlProps.type } error={ !value && formControlProps.errorActive }
        label={ formControlProps.label } color={ formControlProps.labelColor }
        name={ formControlProps.label } value={ value }
        onChange={ (e) => handleChange(e) } helperText={ formHelperText() }
      />
    </FormControl>
  )
}