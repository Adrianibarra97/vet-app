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
import {
  ValidateFormByFields,
  professionalSchema,
} from '../../util/ValidateFormByFields'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { Vet } from '../../domain/Vet'
import { PetOwner } from '../../domain/PetOwner'
import { User } from '../../domain/User'
type UserType = User | Vet | PetOwner

interface Props {
  user: UserType
  onSave: (updated: Vet | PetOwner) => void
  showProfessionalInfo: boolean
}
const vetPersonalFields = [
  { label: 'Username', key: 'username' },
  { label: 'Nombre', key: 'name' },
  { label: 'DNI', key: 'dni' },
  { label: 'Email', key: 'email' },
  { label: 'Código Postal', key: 'postalCode' },
  { label: 'Provincia', key: 'province' },
  { label: 'Contraseña', key: 'password' },
  { label: 'Apellido', key: 'surname' },
  { label: 'Celular', key: 'telephone' },
  { label: 'Dirección', key: 'address' },
  { label: 'Localidad', key: 'locality' },
  { label: 'País', key: 'country' },
]

const petOwnerPersonalFields = [
  { label: 'Username', key: 'username' },
  { label: 'Nombre', key: 'name' },
  { label: 'DNI', key: 'dni' },
  { label: 'Email', key: 'email' },
  { label: 'Código Postal', key: 'postalCode' },
  { label: 'Provincia', key: 'province' },
  { label: 'Contacto de Emergencia', key: 'emergencyContactName' },
  { label: 'Contraseña', key: 'password' },
  { label: 'Apellido', key: 'surname' },
  { label: 'Celular', key: 'telephone' },
  { label: 'Dirección', key: 'address' },
  { label: 'Localidad', key: 'locality' },
  { label: 'País', key: 'country' },
  { label: 'Teléfono de Emergencia', key: 'emergencyContactPhone' },
]

const professionalFields = [
  { label: 'Matrícula', key: 'licence' },
  { label: 'Teléfono Laboral', key: 'professionalTelephone' },
  { label: 'Dirección Laboral', key: 'professionalAddress' },
  { label: 'Código Postal Laboral', key: 'professionalPostalCode' },
  { label: 'Especialidad', key: 'speciality' },
  { label: 'Email Profesional', key: 'professionalEmail' },
  { label: 'Localidad Laboral', key: 'professionalLocality' },
  { label: 'Horario de atención', key: 'businessHours' },

]

export const ProfileForm = ({ user, onSave, showProfessionalInfo }: Props) => {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editProfessional, setEditProfessional] = useState(false)

  const [personalForm, setPersonalForm] = useState<UserType>(user)
  const [professionalForm, setProfessionalForm] = useState<UserType>(user)

  const [personalErrors, setPersonalErrors] = useState<{
    [key: string]: string
  }>({})
  const [professionalErrors, setProfessionalErrors] = useState<{
    [key: string]: string
  }>({})

  const fieldsToUse =
    user instanceof Vet ? vetPersonalFields : petOwnerPersonalFields
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (
    section: 'personal' | 'professional',
    key: string,
    value: string,
  ) => {
    if (section === 'personal') {
      const updated = Object.assign(
        Object.create(Object.getPrototypeOf(user)),
        { ...personalForm, [key]: value },
      )
      setPersonalForm(updated)
    } else {
      const updated = Object.assign(
        Object.create(Object.getPrototypeOf(user)),
        { ...professionalForm, [key]: value },
      )
      setProfessionalForm(updated)
    }
  }
  const handleSave = async (section: 'personal' | 'professional') => {
    try {
      if (section === 'personal') {
        await ValidateFormByFields.validate(personalForm, { abortEarly: false })
        setPersonalErrors({})

        if (user instanceof Vet) {
          const vetData = {
            ...personalForm,
            ...(editProfessional ? professionalForm : {}),
            typeOfUser: 'vet',
          }
          const updatedVet = Vet.fromJSON(vetData)
          await onSave(updatedVet)
        } else {
          const petOwnerData = {
            ...personalForm,
            typeOfUser: 'petOwner',
          }
          const updatedPetOwner = PetOwner.fromJSON(petOwnerData)
          await onSave(updatedPetOwner)
        }

        setEditPersonal(false)
        SnackbarUtilities.succes(
          'Información personal actualizada correctamente',
        )
      } else if (user instanceof Vet) {
        await professionalSchema.validate(professionalForm, {
          abortEarly: false,
        })
        setProfessionalErrors({})

        const vetData = {
          ...personalForm,
          ...professionalForm,
          typeOfUser: 'vet',
        }
        const updatedVet = Vet.fromJSON(vetData)

        await onSave(updatedVet)
        setEditProfessional(false)
        SnackbarUtilities.succes(
          'Información profesional actualizada correctamente',
        )
      }
    } catch (error: any) {
      const errors: { [key: string]: string } = {}
      if (error.inner) {
        error.inner.forEach((err: any) => {
          errors[err.path] = err.message
        })
      } else {
        errors.general = error.message
      }

      if (section === 'personal') {
        setPersonalErrors(errors)
      } else if (user instanceof Vet) {
        setProfessionalErrors(errors)
      }

      SnackbarUtilities.error(
        'Por favor completá todos los campos obligatorios correctamente.',
      )
    }
  }
  const handleCancel = (section: 'personal' | 'professional') => {
    const reset = Object.assign(
      Object.create(Object.getPrototypeOf(user)),
      user,
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
    errors: { [key: string]: string },
  ) => (
    <>
      {fields.map(({ label, key, vetProp }) => {
        const realKey =
          section === 'professional' && user instanceof Vet
            ? (vetProp ?? key)
            : key
        const isPasswordField = realKey === 'password'
        return (
          <div className="data__item" key={realKey}>
            <label className="data__item--label">{label}</label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              className="data__item--input"
              value={form[realKey] ?? ''}
              type={isPasswordField && !showPassword ? 'password' : 'text'}
              onChange={(e) => handleChange(section, realKey, e.target.value)}
              disabled={!edit}
              error={!!errors[realKey]}
              helperText={errors[realKey]}
              sx={{
                mt: 0.5,
                height: '3.5em',
                width: { xs: '100%', md: '100%' },
                '& .MuiInputBase-input': {
                  height: '2em',
                },
              }}
              InputProps={
                isPasswordField
                  ? {
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }
                  : undefined
              }
            />
          </div>
        )
      })}
    </>
  )

  return (
    <form className="data">
      <Box
        className="data__section"
        sx={{
          height: 'auto',
          minHeight: '20em',
          width: '100%',
          paddingBottom: '2em',
          boxSizing: 'border-box',
          mt: 2,
        }}
      >
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
        <Box
          className="section__content"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Box
            className="section__items"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxwidth: '100%',
            }}
          >
            {' '}
            {renderFields(
              fieldsToUse.slice(0, Math.ceil(fieldsToUse.length / 2)),
              personalForm,
              editPersonal,
              'personal',
              personalErrors,
            )}
          </Box>
          <Box
            className="section__items"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxwidth: '100%',
            }}
          >
            {' '}
            {renderFields(
              fieldsToUse.slice(Math.ceil(fieldsToUse.length / 2)),
              personalForm,
              editPersonal,
              'personal',
              personalErrors,
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
        <Box
          className="data__section"
          sx={{
            height: 'auto',
            minHeight: '20em',
            width: '100%',
            paddingBottom: '2em',
            boxSizing: 'border-box',
            mt: 2,
          }}
        >
          {' '}
          <Box className="section__header">
            <Stack direction="row" alignItems="center">
              <Typography
                className="section__header--title"
                sx={{ fontWeight: 'bold' }}
              >
                Información profesional
              </Typography>
              <IconButton
                onClick={() => setEditProfessional(!editProfessional)}
              >
                <FaPen />
              </IconButton>
            </Stack>
          </Box>
          <Box
            className="section__content"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Box
              className="section__items"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxwidth: '100%',
              }}
            >
              {' '}
              {renderFields(
                professionalFields.slice(
                  0,
                  Math.ceil(professionalFields.length / 2),
                ),
                professionalForm,
                editProfessional,
                'professional',
                professionalErrors,
              )}
            </Box>
            <Box
              className="section__items"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxwidth: '100%',
              }}
            >
              {' '}
              {renderFields(
                professionalFields.slice(
                  Math.ceil(professionalFields.length / 2),
                ),
                professionalForm,
                editProfessional,
                'professional',
                professionalErrors,
              )}
            </Box>
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
