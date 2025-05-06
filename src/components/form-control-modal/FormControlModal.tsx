import { FormControl, Input, Box, InputLabel } from '@mui/material'
import { ChangeEvent } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlInput, formControlItem, formControlLabel, formControlNone } from './FormControlModalStyle'

interface FromControlModalProps {
  isActive: boolean,
  label: string,
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
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
          sx={ formControlInput }
          onChange={ (e) => formControlProps.handleInputChanges(formControlProps.petKey, e) }
        />
      </Box>
    </FormControl>
  )
}