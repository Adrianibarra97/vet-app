import { FormControl, Input, Box, InputLabel, InputBaseComponentProps } from '@mui/material'
import { ChangeEvent } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlInput, formControlItem, formControlLabel, formControlNone } from './FormControlModalImageStyle'

interface FromControlModalProps {
  isActive: boolean,
  label: string,
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
  inputProp: InputBaseComponentProps
}

export const FormControlModalImage = (formControlProps: FromControlModalProps) => {
  return (
    <FormControl fullWidth margin="normal" variant="filled" sx={ formControlProps.isActive ? formControl : formControlNone }>
      <Box sx={ formControlItem }>
        <Input
          type= 'file' sx={ formControlInput }
          inputProps={ formControlProps.inputProp }
          onChange={ (e) => formControlProps.handleInputChanges(formControlProps.petKey, e) }
        />
      </Box>
    </FormControl>
  )
}