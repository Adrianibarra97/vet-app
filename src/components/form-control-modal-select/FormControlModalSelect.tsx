import { FormControl, Box, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlItem, formControlLabel, formControlNone, formControlSelect } from './FormControlModalSelectStyle'

interface FromControlModalProps {
  isActive: boolean,
  label: string,
  options: string[],
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: SelectChangeEvent): void
}

export const FormControlModalSelect = (formControlProps: FromControlModalProps) => {

  const [currentValue, setCurrentValue] = useState(formControlProps.options[0])

  const handleSelectChanges = (key: keyof Pet, e: SelectChangeEvent) => {
    formControlProps.handleInputChanges(key, e)
    setCurrentValue(e.target.value)
  }

  return (
    <FormControl fullWidth margin="normal" variant="filled" sx={ formControlProps.isActive ? formControl : formControlNone }>
      <Box sx={ formControlItem }>
        <InputLabel
          sx={ formControlLabel }
          color={ formControlProps.labelColor }
        >{ formControlProps.label }</InputLabel>
      </Box>
      <Box sx={ formControlItem }>
        <Select
          value={ currentValue } sx={ formControlSelect }
          onChange={(e) => handleSelectChanges(formControlProps.petKey, e)}
        >
          { formControlProps.options.map(value => 
            <MenuItem key={ value } value={ value }>{ value }</MenuItem>
          )}
        </Select>
      </Box>
    </FormControl>
  )
}