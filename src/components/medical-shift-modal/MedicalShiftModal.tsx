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
import { LocalizationProvider} from '@mui/x-date-pickers'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'

interface MedicalShiftModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (medicalShift: MedicalShift, idMedicalShift: number) => void
  idMedicalShift: number
}

export function MedicalShiftModal({
  open,
  onClose,
  onConfirm,
  idMedicalShift,
}: MedicalShiftModalProps) {
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
    <Modal open={open} onClose={handleCancel}>
      <Box
        sx={{
          width: 400,
          maxWidth: '95vw',
          maxHeight: '90vh',
          margin: 'auto',
          mt: '10vh',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: 'var(--primary-color)' }}>
          {idMedicalShift > -1 ? 'Editar Consulta' : 'Crear Consulta'}
        </Typography>
        {idMedicalShift === -1 && (
          <TextField
            label="Nombre de Veterinario"
            fullWidth
            variant="outlined"
            margin="normal"
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
              '& label.Mui-focused': {
                color: 'var(--footer-color)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--footer-color)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--footer-color)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--footer-color)',
                },
              },
            }}
          />
        )}
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          error={fromTouched && !medicalShift.petName}
          sx={{
            '& label.Mui-focused': {
              color: 'var(--footer-color)',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'var(--footer-color)',
              },
            },
          }}
        >
          <InputLabel
            color={fromTouched && !medicalShift.petName ? 'error' : 'primary'}
          >
            Paciente
          </InputLabel>
          <Select
            value={medicalShift.petName ? `${medicalShift.petName}` : ''}
            onChange={(event) =>
              handleMedicalShiftCreationOrEdition('petName', event.target.value)
            }
            label="Paciente"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--footer-color)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--footer-color)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--footer-color)',
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
    sx={{
      width: '100%',
    }}
    format="DD/MM/YYYY hh:mm A"
    label="Fecha y hora"
    value={date}
    defaultValue={dayjs()}
    minDateTime={dayjs()}
    onChange={(newDate) => {
      if (newDate && newDate.isValid()) {
        setError(null);
        setDate(newDate);
        handleMedicalShiftCreationOrEdition('date', newDate.toISOString());
      } else {
        setError('Por favor, selecciona una fecha válida.');
        setDate(dayjs(medicalShift.date));
      }
    }}
    slotProps={{
      textField: {
        error: !!error,
        helperText: error,
      },
      popper: {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              tether: false,
              padding: 10,
            },
          },
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
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
