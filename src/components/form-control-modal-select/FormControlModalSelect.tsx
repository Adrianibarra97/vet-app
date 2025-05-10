import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { Pet } from '../../domain/Pet'
import { formControl, formControlNone, label } from './FormControlModalSelectStyle'

interface FromControlModalProps {
  isActive: boolean,
  label: string,
  options: string[],
  defaultValue: string,
  labelColor: 'primary' | 'error',
  petKey: keyof Pet,
  handleInputChanges(key: keyof Pet, e: SelectChangeEvent): void
}

export const FormControlModalSelect = (formControlProps: FromControlModalProps) => {

  const [currentValue, setCurrentValue] = useState(formControlProps.defaultValue)

  const handleSelectChanges = (key: keyof Pet, e: SelectChangeEvent) => {
    formControlProps.handleInputChanges(key, e)
    setCurrentValue(e.target.value)
  }

  return (
    <FormControl sx={ formControlProps.isActive ? formControl : formControlNone }>
      <InputLabel sx={ label } color={ formControlProps.labelColor }>{ formControlProps.label }</InputLabel>
      <Select
        value={ currentValue }
        onChange={(e) => handleSelectChanges(formControlProps.petKey, e)}
        input={<OutlinedInput label={ formControlProps.label }/>}
      >{ formControlProps.options.map(value => <MenuItem key={ value } value={ value }>{ value }</MenuItem>) }</Select>
    </FormControl>
  )
}