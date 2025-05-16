import { FormControl, Box, Typography, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { formControl, formControlNone, helpText, textField } from './FormControlModalLoginStyle'

interface FromControlModalProps {
  isActive: boolean
  errorActive: boolean
  label: string
  type: 'text' | 'number' | 'password'
  defaultValue: string
  labelColor: 'primary' | 'error'
  handleInputChanges(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

export const FormControlModalLogin = (formControlProps: FromControlModalProps) => {

  const [value, setValue] = useState(formControlProps.defaultValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formControlProps.handleInputChanges(e)
    setValue(e.target.value)
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
        label={ formControlProps.label } color="success"
        name={ formControlProps.label } value={ value }
        onChange={ (e) => handleChange(e) } helperText={ formHelperText() }
      />
    </FormControl>
  )
}