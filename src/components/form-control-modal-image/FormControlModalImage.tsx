import { FormControl, Input, Box, InputBaseComponentProps } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlInput, formControlItem, formControlNone } from './FormControlModalImageStyle'

interface FromControlModalProps {
  isActive: boolean,
  label: string,
  defaultValue: File | undefined,
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: ChangeEvent<HTMLInputElement>): void,
  inputProp: InputBaseComponentProps
}

export const FormControlModalImage = (formControlProps: FromControlModalProps) => {

  const [file, setFile] = useState(formControlProps.defaultValue)

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    formControlProps.handleInputChanges(formControlProps.petKey, e)
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  return (
    <FormControl fullWidth margin="normal" variant="filled" sx={ formControlProps.isActive ? formControl : formControlNone }>
      <Box sx={ formControlItem }>
        <Input
          value={ file }
          type= 'file' sx={ formControlInput }
          inputProps={ formControlProps.inputProp }
          onChange={ (e) => handleChanges(e) }
        />
      </Box>
    </FormControl>
  )
}