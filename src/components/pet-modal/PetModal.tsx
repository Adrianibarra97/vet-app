import { useEffect, useState } from 'react'
import { MedicalShift } from '../../domain/MedicalShift'
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { Pet } from '../../domain/Pet'
import PetServiceManager from '../../services/pet-service/PetServiceManager'
import MedicalShiftServiceManager from '../../services/medical-shift-service/MedicalShiftServiceManager'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'

interface PetModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (medicalShift: MedicalShift, idMedicalShift: number) => void
  idMedicalShift: number
}

export const MedicalShiftModal = ({ open, onClose, onConfirm, idMedicalShift }: PetModalProps) => {
  
  const [petPacients, setPetPacients] = useState<Pet[]>([])
  const [medicalShift, setMedicalShift] = useState<MedicalShift>(
    new MedicalShift(),
  )
  const [fromTouched, setFromTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState<Dayjs | null>(null)

  const handleMedicalShiftCreationOrEdition = (
    name: keyof MedicalShift,
    value: string,
  ): void => {
    ;(
      medicalShift as unknown as Record<keyof MedicalShift, string | undefined>
    )[name] = value
    generateNewMedicalShift(medicalShift)
  }

  const generateNewMedicalShift = (medicalShift: MedicalShift) => {
    const newMedicalShift = Object.assign(new MedicalShift(), medicalShift)
    setMedicalShift(newMedicalShift)
  }

  const getPetPacients = async () => {
    const newPetPacients = PetServiceManager.getIntance().getAll()
    setPetPacients(await newPetPacients)
  }

  const getMedicalShift = async () => {
    const newMedicalShift =
      MedicalShiftServiceManager.getInstance().getMedicalShiftById(
        +idMedicalShift!,
      )
    setMedicalShift(await newMedicalShift)
  }

  useEffect(() => {
    setMedicalShift(new MedicalShift())
    setFromTouched(false)
    setError(null)
    setDate(null)
    if (idMedicalShift > -1) {
      getMedicalShift()
    } else {
      setMedicalShift(new MedicalShift())
    }
    getPetPacients()
    setFromTouched(false)
  }, [idMedicalShift, setFromTouched])

  useEffect(() => {
    if (medicalShift?.date) {
      setDate(dayjs(medicalShift.date))
    } else {
      setDate(null)
    }
  }, [medicalShift])

  const handleOnConfirm = () => {
    setFromTouched(true)
    if (hasMissingRequiredFields()) {
      SnackbarUtilities.error('campos incompletos')
      return
    }
    onConfirm(medicalShift, medicalShift.id)
    setMedicalShift(new MedicalShift())
    setFromTouched(false)
    onClose()

  }
  const handleCancel = () => {
    setMedicalShift(new MedicalShift())
    setFromTouched(false)
    setError(null)
    setDate(null)
    onClose()
  }

  const hasMissingRequiredFields = (): boolean => {
    const requiredFields: (keyof MedicalShift)[] = [
      'vetName',
      'petName',
      'date',
    ]
    return requiredFields.some((field) => !medicalShift[field])
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          maxWidth: '90vw',
          margin: 'auto',
          mt: '10vh',
          p: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: 'var(--primary-color)' }}>
          {idMedicalShift > -1 ? 'Editar Consulta' : 'Crear Consulta'}
        </Typography>
        {idMedicalShift == -1 && (
          <TextField
            label="Nombre de Veterinario"
            fullWidth
            variant="filled"
            margin="normal"
            color="primary"
            name="vetName"
            required
            value={medicalShift.vetName}
            onChange={(event) =>
              handleMedicalShiftCreationOrEdition('vetName', event.target.value)
            }
            error={fromTouched && !medicalShift.vetName}
            helperText={
              fromTouched && !medicalShift.vetName ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color="red">
                    El veterinario es obligatorio
                  </Typography>
                </Box>
              ) : (
                ''
              )
            }
            sx={{ 
           
            
              '& .MuiInputLabel-root': {
                color: 'var(--footer-color)',
              },
              '& .Mui-focused .MuiInputLabel-root': {
                color: 'var(--footer-color)',
              },
              '& .MuiFilledInput-root': {
                color: 'var(--footer-color)',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: 'var(--footer-color)',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: 'var(--footer-color)',
              },
              '& input:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px white inset',
                WebkitTextFillColor: 'var(--footer-color)',
              },
            }}
          
          />
        )}
        <FormControl
          fullWidth
          margin="normal"
          variant="filled"
          error={fromTouched && !medicalShift.petName}
        >
          <InputLabel
            color={fromTouched && !medicalShift.petName ? 'error' : 'primary'}
            sx={{
              color: 'var(--footer-color)',
              '&.Mui-focused': {
                color: 'var(--footer-color)',
              },
            }}
          >
            Paciente
          </InputLabel>

          <Select
            labelId="paciente-label"
            value={medicalShift.petName ? `${medicalShift.petName}` : ''}
            onChange={(event) =>
              handleMedicalShiftCreationOrEdition('petName', event.target.value)
            }
            label="Paciente"
            fullWidth
            color="primary"
            variant="filled"
            sx={{ 
           
              '@media (max-width:600px)': {
                color: 'var(--footer-color)!important',
              },
            
              '& .MuiInputLabel-root': {
                color: 'var(--footer-color)',
              },
              '& .Mui-focused .MuiInputLabel-root': {
                color: 'var(--footer-color)',
              },
              '& .MuiFilledInput-root': {
                color: 'var(--footer-color)',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: 'var(--footer-color)',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: 'var(--footer-color)',
              },
              '& input:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px white inset',
                WebkitTextFillColor: 'var(--footer-color)',
              },
            }}
          >
            <MenuItem value="">
              <em>Seleccionar Paciente</em>
            </MenuItem>
            {petPacients.map((pet) => (
              <MenuItem value={`${pet.name}`} key={pet.name}>
                {pet.name}
              </MenuItem>
            ))}
          </Select>
          {fromTouched && !medicalShift.petName && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography color="red">El paciente es obligatorio</Typography>
            </Box>
          )}
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            format="DD/MM/YYYY hh:mm A"
            label="Fecha y hora"
            name="fechaInicio"
            value={date}
            defaultValue={dayjs()}
            minDateTime={dayjs()}
            onChange={(newDate) => {
              if (newDate && newDate.isValid()) {
                setError(null)
                setDate(newDate)
                handleMedicalShiftCreationOrEdition(
                  'date',
                  newDate.toISOString(),
                )
              } else {
                setError('Por favor, selecciona una fecha válida.')
                setDate(dayjs(medicalShift.date))
              }
            }}
            slotProps={{
              textField: {
                variant: 'filled',
                fullWidth: true,
                error: !!error,
                helperText: error,
                sx: {
                  '& .MuiInputLabel-root': {
                    color: 'var(--footer-color)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--footer-color)',
                  },
                  '& .MuiFilledInput-root': {
                    color: 'var(--footer-color)',
                    backgroundColor: '#f9f9f9',
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                    '&::before': {
                      borderBottomColor: 'var(--footer-color)',
                    },
                    '&:hover::before': {
                      borderBottomColor: 'var(--footer-color)',
                    },
                    '&::after': {
                      borderBottomColor: 'var(--footer-color)',
                    },
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'var(--footer-color)',
                  },
                  '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                    WebkitTextFillColor: 'var(--footer-color)',
                  },
                },
              },
              popper: {
                sx: {
                  '& .MuiPickersDay-root.Mui-selected': {
                    backgroundColor: 'var(--footer-color)',
                    '&:hover': {
                      backgroundColor: '#479986',
                    },
                  },
                  '& .MuiPickersDay-root:focus': {
                    backgroundColor: 'var(--footer-color)',
                  },
                  '& .MuiPickersDay-today': {
                    borderColor: 'var(--footer-color)',
                  },
                  '& .MuiPickersCalendarHeader-label': {
                    color: 'var(--footer-color)',
                  },
                  '& .MuiPickersArrowSwitcher-root button': {
                    color: 'var(--footer-color)',
                  },
                  '& .MuiDialogActions-root button': {
                    color: 'var(--footer-color)',
                  },
                  '& .MuiClock-root': {
                    backgroundColor: '#f9f9f9',
                  },
                  '& .MuiClockPointer-root': {
                    backgroundColor: 'var(--footer-color)',
                  },
                  '& .MuiClockPointer-thumb': {
                    border: '14px solid var(--footer-color)',
                    backgroundColor: 'var(--footer-color)',
                  },
                  '& .MuiClockNumber-root.Mui-selected': {
                    backgroundColor: 'var(--footer-color)',
                    color: 'white',
                  },
                  '& .MuiClockNumber-root:hover': {
                    backgroundColor: '#d5f0e7',
                  },
                  '& .MuiPickersLayout-contentWrapper .Mui-selected': {
                    backgroundColor: 'var(--footer-color)',
                    color: '#fff',
                  },
                  '& .MuiPickersLayout-contentWrapper .MuiButtonBase-root:hover': {
                    backgroundColor: '#d5f0e7',
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={{ backgroundColor: 'var(--primary-color)' }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleOnConfirm}
            sx={{ backgroundColor: 'var(--footer-color)' }}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
