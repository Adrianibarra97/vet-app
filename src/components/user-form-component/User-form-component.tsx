import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import './User-form-component.css'
import { ValidateFormByFields, professionalSchema } from '../../util/ValidateFormByFields'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { Vet } from '../../domain/Vet'
import { PetOwner } from '../../domain/PetOwner'
import { User} from '../../domain/User'
type UserType = User | Vet | PetOwner

interface Props {
  user: UserType
  onSave: (updated: UserType) => void
  showProfessionalInfo: boolean
}
const personalFields = [
  { label: 'Nombre', key: 'name' },
  { label: 'Apellido', key: 'surname' },
  { label: 'DNI', key: 'dni' },
  { label: 'Username', key: 'username' },
  { label: 'Contraseña', key: 'password' },
  { label: 'Celular', key: 'telephone' },
  { label: 'Email', key: 'email' },
  { label: 'Dirección', key: 'adress' },
  { label: 'Localidad', key: 'location' },
  { label: 'Código Postal', key: 'postalCode' },
  { label: 'Provincia', key: 'province' },
 
]


const professionalFields = [
  { label: 'Matrícula', key: 'license', vetProp: 'licence' },
  { label: 'Teléfono Laboral', key: 'workPhone', vetProp: 'professionalTelephone' },
  { label: 'Especialidad', key: 'specialty', vetProp: 'specialty' },
  { label: 'Dirección Laboral', key: 'workAdress', vetProp: 'professionalAdress' },
  { label: 'Localidad Laboral', key: 'workLocation', vetProp: 'professionalLocation' },
  { label: 'Provincia Laboral', key: 'workProvince', vetProp: 'professionalProvince' },
  { label: 'Email Profesional', key: 'professionalEmail', vetProp: 'professionalEmail' },
  { label: 'Horario de atención', key: 'attentionSchedule', vetProp: 'businessHours' },
]


export const ProfileForm = ({ user, onSave, showProfessionalInfo }: Props) => {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editProfessional, setEditProfessional] = useState(false)

  const [personalForm, setPersonalForm] = useState<UserType>(user)
  const [professionalForm, setProfessionalForm] = useState<UserType>(user)

  const [personalErrors, setPersonalErrors] = useState<{ [key: string]: string }>({})
  const [professionalErrors, setProfessionalErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (
    section: 'personal' | 'professional',
    key: string,
    value: string
  ) => {
    if (section === 'personal') {
      const updated = Object.assign(
        Object.create(Object.getPrototypeOf(user)),
        { ...personalForm, [key]: value }
      )
      setPersonalForm(updated)
    } else {
      const updated = Object.assign(
        Object.create(Object.getPrototypeOf(user)),
        { ...professionalForm, [key]: value }
      )
      setProfessionalForm(updated)
    }
  }
  const handleSave = async (section: 'personal' | 'professional') => {
    try {
      if (section === 'personal') {
        await ValidateFormByFields.validate(personalForm, { abortEarly: false })
        setPersonalErrors({})
  
        const updated = Object.assign(
          Object.create(Object.getPrototypeOf(user)),
          { ...user, ...personalForm }
        ) as UserType
  
        onSave(updated)
        setEditPersonal(false)
        SnackbarUtilities.succes('Información personal actualizada correctamente ')
      } else {
        if (user instanceof Vet) {
          await professionalSchema.validate(professionalForm, { abortEarly: false })
          setProfessionalErrors({})
  
          const updated = Object.assign(
            Object.create(Object.getPrototypeOf(user)),
            { ...user, ...professionalForm }
          ) as Vet
  
          onSave(updated)
          setEditProfessional(false)
          SnackbarUtilities.succes('Información profesional actualizada correctamente ')
        }
      }
    } catch (error: any) {
      const errors: { [key: string]: string } = {}
      error.inner.forEach((err: any) => {
        errors[err.path] = err.message
      })
      section === 'personal' ? setPersonalErrors(errors) : setProfessionalErrors(errors)
      SnackbarUtilities.error('Por favor completá todos los campos obligatorios correctamente.')
    }
  }
  const handleCancel = (section: 'personal' | 'professional') => {
    const reset = Object.assign(
      Object.create(Object.getPrototypeOf(user)),
      user
    )
  
    if (section === 'personal') {
      setEditPersonal(false)
      setPersonalForm(reset)
      setPersonalErrors({})
    } else {
      setEditProfessional(false)
      setProfessionalForm(reset)
      setProfessionalErrors({})
    }
  }

  const renderFields = (
    fields: { label: string; key: string; vetProp?: string }[],
    form: any,
    edit: boolean,
    section: 'personal' | 'professional',
    errors: { [key: string]: string }
  ) => (
    <Box className="section__items">
      {fields.map(({ label, key, vetProp }) => {
        const realKey = section === 'professional' && user instanceof Vet ? vetProp ?? key : key
        return (
          <div className="data__item" key={realKey}>
            <label className="data__item--label">{label}</label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              className="data__item--input"
              value={form[realKey] ?? ''}
              onChange={(e) => handleChange(section, realKey, e.target.value)}
              disabled={!edit}
              error={!!errors[realKey]}
              helperText={errors[realKey]}
            />
          </div>
        )
      })}
    </Box>
  )


  return (
    <form className="data">
<Box className="data__section"  sx={{
    height: 'auto',        
    minHeight: '20em',    
    width: '100%',
    paddingBottom: '2em',  
    boxSizing: 'border-box' 
  }}>
<Box className="section__header">
          <Stack direction="row" alignItems="center">
            <Typography
              className="section__header--title"
              sx={{ fontWeight: 'bold' }}
            >
              Información personal
            </Typography>
            <IconButton onClick={() => setEditPersonal(!editPersonal)}>
              <FaPen />
            </IconButton>
          </Stack>
        </Box>
        <Box className="section__content">
        {renderFields(
            personalFields.slice(0, 7),
            personalForm,
            editPersonal,
            'personal',
            personalErrors
          )}
          {renderFields(
            personalFields.slice(4),
            personalForm,
            editPersonal,
            'personal',
            personalErrors
          )}
        </Box>
        {editPersonal && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ px: 5, pb: 2 }}
          >
            <Button
              variant="outlined"
              sx={{
                color: 'var(--font-color)',
                borderColor: 'var(--footer-color)',
                '&:hover': { borderColor: 'var(--primary-color)' },
              }}
              onClick={() => handleCancel('personal')}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--font-color)',
                '&:hover': { backgroundColor: 'var(--footer-color)' },
              }}
              onClick={() => handleSave('personal')}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Box>

      {showProfessionalInfo && user instanceof Vet && (
              <Box className="data__section">
        <Box className="section__header">
          <Stack direction="row" alignItems="center">
            <Typography
              className="section__header--title"
              sx={{ fontWeight: 'bold' }}
            >
              Información profesional
            </Typography>
            <IconButton onClick={() => setEditProfessional(!editProfessional)}>
              <FaPen />
            </IconButton>
          </Stack>
        </Box>
        <Box className="section__content">
          {renderFields(
            professionalFields.slice(0, 3),
            professionalForm,
            editProfessional,
            'professional',
            professionalErrors,
          )}
          {renderFields(
            professionalFields.slice(3),
            professionalForm,
            editProfessional,
            'professional',
            professionalErrors,
          )}{' '}
        </Box>
        {editProfessional && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ px: 4, pb: 2 }}
          >
            <Button
              variant="outlined"
              sx={{
                color: 'var(--font-color)',
                borderColor: 'var(--footer-color)',
                '&:hover': { borderColor: 'var(--primary-color)' },
              }}
              onClick={() => handleCancel('professional')}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--font-color)',
                '&:hover': { backgroundColor: 'var(--footer-color)' },
              }}
              onClick={() => handleSave('professional')}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Box>
      )}
    </form>
  )
}
