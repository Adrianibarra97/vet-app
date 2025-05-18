import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
} from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import {Autocomplete} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FaPen } from 'react-icons/fa'
import './User-form-component.css'
import {
  ValidateFormByFields,
  professionalSchema,
} from '../../util/ValidateFormByFields'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { Vet, VetJSON } from '../../domain/Vet'
import { PetOwner, PetOwnerJSON } from '../../domain/PetOwner'
import { User } from '../../domain/User'
import {
  buttonContained,
  buttonOutlined,
  buttonStack,
  headerTitle,
  professionalButtonStack,
  sectionContainer,
} from './User-form-Componente-Style'

type UserType = User | Vet | PetOwner

interface Props {
  user: UserType
  onSave: (updated: Vet | PetOwner) => void
  showProfessionalInfo: boolean
}

const vetPersonalFields = [
  { label: 'Username', key: 'username' },
  { label: 'Contraseña', key: 'password' },
  { label: 'Nombre', key: 'name' },
  { label: 'Apellido', key: 'surname' },
  { label: 'Email', key: 'email' },
  { label: 'Celular', key: 'telephone' },
  { label: 'DNI', key: 'dni' },
  { label: 'País', key: 'country' },
  { label: 'Provincia', key: 'province' },
  { label: 'Localidad', key: 'locality' },
  { label: 'Dirección', key: 'address' },
  { label: 'Código Postal', key: 'postalCode' },
]

const petOwnerPersonalFields = [
  { label: 'Username', key: 'username' },
  { label: 'Contraseña', key: 'password' },
  { label: 'Nombre', key: 'name' },
  { label: 'Apellido', key: 'surname' },
  { label: 'Email', key: 'email' },
  { label: 'Celular', key: 'telephone' },
  { label: 'DNI', key: 'dni' },
  { label: 'Contacto de Emergencia', key: 'emergencyContactName' },
  { label: 'Teléfono de Emergencia', key: 'emergencyContactPhone' },
  { label: 'País', key: 'country' },
  { label: 'Provincia', key: 'province' },
  { label: 'Localidad', key: 'locality' },
  { label: 'Dirección', key: 'address' },
  { label: 'Código Postal', key: 'postalCode' },
]

const professionalFields = [
  { label: 'Matrícula', key: 'licence' },
  { label: 'Especialidad', key: 'speciality' },
  { label: 'Email Profesional', key: 'professionalEmail' },
  { label: 'Teléfono Laboral', key: 'professionalTelephone' },
  { label: 'Localidad Laboral', key: 'professionalLocality' },
  { label: 'Dirección Laboral', key: 'professionalAddress' },
  { label: 'Código Postal Laboral', key: 'professionalPostalCode' },
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

  const [provinces, setProvinces] = useState<string[]>([])
  const [localities, setLocalities] = useState<string[]>([])

  useEffect(() => {
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
      .then((res) => res.json())
      .then((data) => setProvinces(data.provincias.map((p: any) => p.nombre)))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (personalForm.province) {
      fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${personalForm.province}&max=1500`,
      )
        .then((res) => res.json())
        .then((data) =>
          setLocalities(data.localidades.map((l: any) => l.nombre)),
        )
        .catch((err) => console.error(err))
    }
  }, [personalForm.province])

  const handleChange = (
    section: 'personal' | 'professional',
    key: string,
    value: string,
  ) => {
    const updated = Object.assign(
      Object.create(Object.getPrototypeOf(user)),
      section === 'personal'
        ? { ...personalForm, [key]: value }
        : { ...professionalForm, [key]: value },
    )
    section === 'personal'
      ? setPersonalForm(updated)
      : setProfessionalForm(updated)
  }

  const handleSave = async (section: 'personal' | 'professional') => {
    try {
      if (section === 'personal') {
        await ValidateFormByFields.validate(personalForm, { abortEarly: false })
        setPersonalErrors({})

        if (user instanceof Vet) {
          const fullVetForm: VetJSON = {
            ...user.toJSON(),
            ...personalForm,
            ...(editProfessional ? professionalForm : {}),
            typeOfUser: 'vet',
          }
          await onSave(Vet.fromJSON(fullVetForm))
        } else if (user instanceof PetOwner) {
          const fullPetOwnerForm: PetOwnerJSON = {
            ...user.toJSON(),
            ...personalForm,
            typeOfUser: 'petOwner',
          }
          await onSave(PetOwner.fromJSON(fullPetOwnerForm))
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

        const updatedVetForm: VetJSON = {
          ...user.toJSON(),
          ...personalForm,
          ...professionalForm,
          typeOfUser: 'vet',
        }

        await onSave(Vet.fromJSON(updatedVetForm))
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
      section === 'personal'
        ? setPersonalErrors(errors)
        : setProfessionalErrors(errors)

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
          {realKey === 'country' ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              className="data__item--input"
              value="Argentina"
              disabled
            />
          ) : realKey === 'locality' ? (
            <Autocomplete
              freeSolo
              options={localities}
              value={form[realKey] ?? ''}
              onInputChange={(_, newInputValue) =>
                handleChange(section, realKey, newInputValue)
              }
              disabled={!edit}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  size="small"
                  className="data__item--input"
                  disabled={!edit}
                  error={!!errors[realKey]}
                  helperText={errors[realKey]}
                />
              )}
            />
          ) : realKey === 'province' ? (
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              className="data__item--input"
              value={form[realKey] ?? ''}
              onChange={(e) => handleChange(section, realKey, e.target.value)}
              disabled={!edit}
              error={!!errors[realKey]}
              helperText={errors[realKey]}
              SelectProps={{ native: true }}
            >
              {provinces.map((opt, index) => (
                <option key={`${opt}-${index}`} value={opt}>
                  {opt}
                </option>
              ))}
            </TextField>
          ) : (
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
          )}
        </div>
      )
    })}
  </>
)
  return (
    <form className="data">
      <Box className="data__section" sx={sectionContainer}>
        <Box className="section__header">
          <Stack direction="row" alignItems="center">
            <Typography className="section__header--title" sx={headerTitle}>
              Información personal
            </Typography>
            <IconButton onClick={() => setEditPersonal(!editPersonal)}>
              <FaPen />
            </IconButton>
          </Stack>
        </Box>

        <Box className="section__content">
          <Box className="section__items">
            {renderFields(
              fieldsToUse.slice(0, Math.ceil(fieldsToUse.length / 2)),
              personalForm,
              editPersonal,
              'personal',
              personalErrors,
            )}
          </Box>
          <Box className="section__items">
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
            sx={buttonStack}
          >
            <Button
              variant="outlined"
              sx={buttonOutlined}
              onClick={() => handleCancel('personal')}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={buttonContained}
              onClick={() => handleSave('personal')}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Box>

      {showProfessionalInfo && user instanceof Vet && (
        <Box className="data__section" sx={sectionContainer}>
          <Box className="section__header">
            <Stack direction="row" alignItems="center">
              <Typography className="section__header--title" sx={headerTitle}>
                Información profesional
              </Typography>
              <IconButton
                onClick={() => setEditProfessional(!editProfessional)}
              >
                <FaPen />
              </IconButton>
            </Stack>
          </Box>

          <Box className="section__content">
            <Box className="section__items">
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
            <Box className="section__items">
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
              sx={professionalButtonStack}
            >
              <Button
                variant="outlined"
                sx={buttonOutlined}
                onClick={() => handleCancel('professional')}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={buttonContained}
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
