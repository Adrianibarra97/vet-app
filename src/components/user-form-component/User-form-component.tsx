import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
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
const vetPersonalFields = [
  { label: 'Nombre', key: 'name' },  
  { label: 'DNI', key: 'dni' },

  { label: 'Apellido', key: 'surname' },
  { label: 'Username', key: 'username' },
  { label: 'Contraseña', key: 'password' },
  { label: 'Celular', key: 'telephone' },
  { label: 'Email', key: 'email' },
  { label: 'Dirección', key: 'address' },
  { label: 'Localidad', key: 'locality' },
  { label: 'Código Postal', key: 'postalCode' },
  { label: 'Provincia', key: 'province' },
  { label: 'País', key: 'country' },
]

const petOwnerPersonalFields = [
  { label: 'Nombre', key: 'name' },
  { label: 'Apellido', key: 'surname' },
  { label: 'DNI', key: 'dni' },
  { label: 'Username', key: 'username' },
  { label: 'Contraseña', key: 'password' },
  { label: 'Celular', key: 'telephone' },
  { label: 'Email', key: 'email' },
  { label: 'Dirección', key: 'address' },
  { label: 'Localidad', key: 'locality' },
  { label: 'Código Postal', key: 'postalCode' },
  { label: 'Provincia', key: 'province' },
  { label: 'País', key: 'country' },
  { label: 'Contacto de Emergencia', key: 'emergencyContactName' },
  { label: 'Teléfono de Emergencia', key: 'emergencyContactPhone' },
]

const professionalFields = [
  { label: 'Matrícula', key: 'license' },
  { label: 'Especialidad', key: 'specialty' },
  { label: 'Horario de atención', key: 'businessHours' },
  { label: 'Email Profesional', key: 'professionalEmail' },
  { label: 'Teléfono Laboral', key: 'professionalTelephone' },
  { label: 'Dirección Laboral', key: 'professionalAddress' },
  { label: 'Localidad Laboral', key: 'professionalLocality' },
  { label: 'Código Postal Laboral', key: 'professionalPostalCode' },
]



export const ProfileForm = ({ user, onSave, showProfessionalInfo }: Props) => {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editProfessional, setEditProfessional] = useState(false)

  const [personalForm, setPersonalForm] = useState<UserType>(user)
  const [professionalForm, setProfessionalForm] = useState<UserType>(user)

  const [personalErrors, setPersonalErrors] = useState<{ [key: string]: string }>({})
  const [professionalErrors, setProfessionalErrors] = useState<{ [key: string]: string }>({})

  const fieldsToUse = user instanceof Vet ? vetPersonalFields : petOwnerPersonalFields
  const [showPassword, setShowPassword] = useState(false)

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
    <Box
    className="section__items"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%' 
    }}
  >      {fields.map(({ label, key, vetProp }) => {
        const realKey = section === 'professional' && user instanceof Vet ? vetProp ?? key : key
        const isPasswordField = realKey === 'password' //
        return (
          <div className="data__item" key={realKey}>
            <label className="data__item--label">{label}</label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              className="data__item--input"
              value={form[realKey] ?? ''}
              type={isPasswordField && !showPassword ? 'password' : 'text'}              onChange={(e) => handleChange(section, realKey, e.target.value)}
              disabled={!edit}
              error={!!errors[realKey]}
              helperText={errors[realKey]}
              sx={{
                mt: 0.5,
                height: '3.5em',
                '& .MuiInputBase-input': {
                  height: '2em'
                }
              }}
              InputProps={isPasswordField ? {
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              } : undefined}
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
        <Box className="section__content" sx={{ display: 'flex',  gap: 2 }}>
        <Box sx={{ flex: '10 ', maxWidth: '100%' }}>
        {renderFields(
      fieldsToUse.slice(0, Math.ceil(fieldsToUse.length / 2)),
      personalForm,
      editPersonal,
      'personal',
      personalErrors
    )}
  </Box>
  <Box sx={{ flex: '10' }}>
    {renderFields(
      fieldsToUse.slice(Math.ceil(fieldsToUse.length / 2)),
      personalForm,
      editPersonal,
      'personal',
      personalErrors
    )}
  </Box>
</Box>
        {editPersonal && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ px: 3, pb: 2 }}
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
