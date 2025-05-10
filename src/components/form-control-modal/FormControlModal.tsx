import { FormControl, Box, Typography, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlNone, helpText, textField } from './FormControlModalStyle'

interface FromControlModalProps {
  isActive: boolean,
  errorActive: boolean,
  label: string,
  type: 'text' | 'number',
  defaultValue: string | number,
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

export const FormControlModal = (formControlProps: FromControlModalProps) => {

  const [value, setValue] = useState(formControlProps.defaultValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formControlProps.handleInputChanges(formControlProps.petKey, e)
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
        sx={ textField } type={ formControlProps.type } error={ !value }
        label={ formControlProps.label } color={ formControlProps.labelColor }
        name={ formControlProps.label } value={ value }
        onChange={ (e) => handleChange(e) } helperText={ formHelperText() }
      />
    </FormControl>
  )
}