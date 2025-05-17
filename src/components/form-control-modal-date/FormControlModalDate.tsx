import { FormControl } from '@mui/material'
import { useState } from 'react'
import { formControl, formControlNone, textField } from './FormControlModalDateStyle'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

interface FromControlModalProps {
  isActive: boolean
  errorActive: boolean
  label: string
  defaultValue: Dayjs | null
  handleInputChanges(date: Dayjs): void
}

export const FormControlModalDate = (formControlProps: FromControlModalProps) => {
  const [value, setValue] = useState<Dayjs | null>(formControlProps.defaultValue)

  const handleChange = (date: Dayjs | null) => {
    formControlProps.handleInputChanges(dayjs(date))
    setValue(dayjs(date))
  }

  return (
    <FormControl sx={ formControlProps.isActive ? formControl : formControlNone }>
      <LocalizationProvider dateAdapter={ AdapterDayjs }>
        <DatePicker
          sx={ textField } label={ formControlProps.label }
          format="DD/MM/YYYY" name={ formControlProps.label }
          onChange={ handleChange } value={ value }
          slotProps={{ textField: {
            color: 'success',
            error: formControlProps.errorActive,
            required: true
          }}}
        />
      </LocalizationProvider>
    </FormControl>
  )
}