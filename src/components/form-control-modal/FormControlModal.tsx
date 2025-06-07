import { ChangeEvent, useState } from 'react'
import { FormControl, Box, Typography, TextField, IconButton } from '@mui/material'
import { formControl, formControlNone, helpText, textField } from './FormControlModalStyle'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface FromControlModalProps {
  isActive: boolean
  errorActive: boolean
  label: string
  defaultValue: string | number
  type: 'text' | 'number' | 'password' | 'email'
  labelColor: 'success' | 'error'
  handleInputChanges(value: string | number): void
}

export const FormControlModal = (formControlProps: FromControlModalProps) => {

  const [value, setValue] = useState(formControlProps.defaultValue)
  const [showPassword, setShowPassword] = useState(false)

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
        sx={ textField } type={ formControlProps.type == 'password' && showPassword ? 'text' : formControlProps.type } error={ !value && formControlProps.errorActive }
        label={ formControlProps.label } color={ formControlProps.labelColor }
        name={ formControlProps.label } value={ value }
        onChange={ (e) => handleChange(e) } helperText={ formHelperText() }
        InputProps={
          formControlProps.type == 'password'
            ? { endAdornment: (
                <IconButton
                  edge="end" size="small"
                  onClick={ () => setShowPassword(!showPassword) }
                >{ showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>),
              }
            : formControlProps.type == 'number'
            ? {
                
              }
            : {}
        }
      />
    </FormControl>
  )
}