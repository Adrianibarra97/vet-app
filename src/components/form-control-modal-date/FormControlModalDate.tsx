import { FormControl, Input, Box, InputLabel, InputBaseComponentProps } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlInput, formControlItem, formControlLabel, formControlNone } from './FormControlModalDateStyle'

interface FromControlModalProps {
  isActive: boolean,
  label: string,
  defaultValue: string
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
  inputProp: InputBaseComponentProps
}

export const FormControlModalDate = (formControlProps: FromControlModalProps) => {

  const [value, setValue] = useState(formControlProps.defaultValue)

  return (
    <FormControl fullWidth margin="normal" variant="filled" sx={ formControlProps.isActive ? formControl : formControlNone }>
      <Box sx={ formControlItem }>
        <InputLabel
          sx={ formControlLabel }
        >{ formControlProps.label }</InputLabel>
      </Box>
      <Box sx={ formControlItem }>
        <Input
          value={ value }
          type= 'date' sx={ formControlInput }
          inputProps={ formControlProps.inputProp }
          onChange={ (e) => {
            formControlProps.handleInputChanges(formControlProps.petKey, e)
            setValue(e.target.value)
          } }
        />
      </Box>
    </FormControl>
  )
}