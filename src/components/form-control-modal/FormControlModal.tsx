import { FormControl, InputLabel, Input } from '@mui/material'
import { ChangeEvent } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, inputLabelControl } from './FormControlModalStyle'

interface FromControlModalProps {
  label: string,
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

export const FormControlModal = (formControlProps: FromControlModalProps) => {
  return (
    <FormControl fullWidth margin="normal" variant="filled" sx={ formControl }>
      <InputLabel color={ formControlProps.labelColor } sx={ inputLabelControl }>{ formControlProps.label }</InputLabel>
      <Input onChange={ (e) => formControlProps.handleInputChanges(formControlProps.petKey, e) }></Input>
    </FormControl>
  )
}
