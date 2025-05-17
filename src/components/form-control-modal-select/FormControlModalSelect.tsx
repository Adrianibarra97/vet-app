import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { formControl, formControlNone, label } from './FormControlModalSelectStyle'

interface FromControlModalProps {
  isActive: boolean
  label: string
  defaultValue: string
  options: string[]
  labelColor: 'error' | 'success'
  handleInputChanges(value: string): void
}

export const FormControlModalSelect = (formControlProps: FromControlModalProps) => {

  const [currentValue, setCurrentValue] = useState(formControlProps.defaultValue)

  const handleSelectChanges = (e: SelectChangeEvent) => {
    const newValue: string = e.target.value
    formControlProps.handleInputChanges(newValue)
    setCurrentValue(newValue)
  }

  return (
    <FormControl sx={ formControlProps.isActive ? formControl : formControlNone }>
      <InputLabel sx={ label } color={ formControlProps.labelColor }>{ formControlProps.label }</InputLabel>
      <Select
        value={ currentValue } color={ formControlProps.labelColor }
        onChange={ (e) => handleSelectChanges(e) }
        input={ <OutlinedInput label={ formControlProps.label }/> }
      >{ formControlProps.options.map(value => <MenuItem key={ value } value={ value }>{ value }</MenuItem>) }</Select>
    </FormControl>
  )
}