import { FormControl, Input, Box, InputLabel, InputBaseComponentProps } from '@mui/material'
import { ChangeEvent } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlInput, formControlItem, formControlLabel, formControlNone } from './FormControlModalStyle'

interface FromControlModalProps {
  isActive: boolean,
  label: string,
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
  type: string,
  inputProp: InputBaseComponentProps
}

export const FormControlModal = (formControlProps: FromControlModalProps) => {
  return (
    <FormControl fullWidth margin="normal" variant="filled" sx={ formControlProps.isActive ? formControl : formControlNone }>
      <Box sx={ formControlItem }>
        <InputLabel
          sx={ formControlLabel }
          color={ formControlProps.labelColor }
        >{ formControlProps.label }</InputLabel>
      </Box>
      <Box sx={ formControlItem }>
        <Input
          type={ formControlProps.type }
          inputProps={ {
            min: 0,
            max: 500,
            step: 1 // Solo valores enteros positivos
          } }
          sx={ formControlInput }
          onChange={ (e) => formControlProps.handleInputChanges(formControlProps.petKey, e) }
        />
      </Box>
    </FormControl>
  )
}