import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import {  FaPen } from 'react-icons/fa'
import './User-form-component.css'
import { ProfessionalInfo } from '../../domain/ProfessionalInfo'
import { User } from '../../domain/User'
interface Props {
  personal: User
  professional: ProfessionalInfo
  onSave: (section: 'personal' | 'professional', data: any) => void
}

export const ProfileForm = ({ personal, professional, onSave }: Props) => {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editProfessional, setEditProfessional] = useState(false)

  const [personalForm, setPersonalForm] = useState({ ...personal })
  const [professionalForm, setProfessionalForm] = useState({ ...professional })

  const [personalErrors, setPersonalErrors] = useState<{ [key: string]: string }>({})
const [professionalErrors, setProfessionalErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (section: 'personal' | 'professional', key: string, value: string) => {
    if (section === 'personal') {
      setPersonalForm(prev => ({ ...prev, [key]: value }))
    } else {
      setProfessionalForm(prev => ({ ...prev, [key]: value }))
    }
  }
  const validateForm = (
    form: any,
    fields: { label: string; key: string }[]
  ): { valid: boolean; errors: { [key: string]: string } } => {
    const errors: { [key: string]: string } = {}
    fields.forEach(({ key, label }) => {
      if (!form[key] || form[key].toString().trim() === '') {
        errors[key] = `${label} es obligatorio`
      }
    })
    return { valid: Object.keys(errors).length === 0, errors }
  }
  
  const handleCancel = (section: 'personal' | 'professional') => {
    if (section === 'personal') {
      setEditPersonal(false)
      setPersonalForm({ ...personal })
    } else {
      setEditProfessional(false)
      setProfessionalForm({ ...professional })
    }
  }

  const handleSave = (section: 'personal' | 'professional') => {
    if (section === 'personal') {
      const { valid, errors } = validateForm(personalForm, personalFields)
      if (!valid) return setPersonalErrors(errors)
      setPersonalErrors({})
      onSave(section, personalForm)
      setEditPersonal(false)
    } else {
      const { valid, errors } = validateForm(professionalForm, professionalFields)
      if (!valid) return setProfessionalErrors(errors)
      setProfessionalErrors({})
      onSave(section, professionalForm)
      setEditProfessional(false)
    }
  }
  

  const renderFields = (
    fields: { label: string; key: string }[],
    form: any,
    edit: boolean,
    section: 'personal' | 'professional',
    errors: { [key: string]: string }
  ) => (
    <Box className="section__items">
      {fields.map(({ label, key }) => (
        <div className="data__item" key={key}>
          <label className="data__item--label">{label}</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            className="data__item--input"
            value={form[key] ?? ''}
            onChange={(e) => handleChange(section, key, e.target.value)}
            disabled={!edit}
            error={!!errors[key]}
            helperText={errors[key]}
          />
        </div>
      ))}
    </Box>
  )
  
  const personalFields = [
    { label: 'Nombre', key: 'name' },
    { label: 'Apellido', key: 'surname' },
    { label: 'DNI', key: 'dni' },
    { label: 'Dirección', key: 'adress' },
    { label: 'Email', key: 'email' },
    { label: 'Username', key: 'username' },
    { label: 'Celular', key: 'telephone' },
  ]

  const professionalFields = [
    { label: 'Matrícula', key: 'license' },
    { label: 'Teléfono Laboral', key: 'workPhone' },
    { label: 'Especialidad', key: 'specialty' },
    { label: 'Dirección Laboral', key: 'workAdress' },
    { label: 'Email Profesional', key: 'professionalEmail' },
    { label: 'Horario de atención', key: 'attentionSchedule' },
  ]

  return (
    <form className="data">
      {/* Personal Info */}
      <Box className="data__section">
        <Box className="section__header">
          <Stack direction="row" alignItems="center">
            <Typography className="section__header--title" sx={{ fontWeight: 'bold' }}>
              Información personal
            </Typography>
            <IconButton onClick={() => setEditPersonal(!editPersonal)}>
              <FaPen />
            </IconButton>
          </Stack>
        </Box>
        <Box className="section__content">
        {renderFields(personalFields.slice(0, 4), personalForm, editPersonal, 'personal', personalErrors)}
        {renderFields(personalFields.slice(4), personalForm, editPersonal, 'personal', personalErrors)}
        </Box>
        {editPersonal && (
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ px: 4, pb: 2 }}>
            <Button variant="outlined" onClick={() => handleCancel('personal')}>Cancelar</Button>
            <Button variant="contained" onClick={() => handleSave('personal')}>Guardar</Button>
          </Stack>
        )}
      </Box>

      {/* Professional Info */}
      <Box className="data__section">
        <Box className="section__header">
          <Stack direction="row" alignItems="center">
            <Typography className="section__header--title" sx={{ fontWeight: 'bold' }}>
              Información profesional
            </Typography>
            <IconButton onClick={() => setEditProfessional(!editProfessional)}>
              <FaPen />
            </IconButton>
          </Stack>
        </Box>
        <Box className="section__content">
        {renderFields(professionalFields.slice(0, 3), professionalForm, editProfessional, 'professional', professionalErrors)}
        {renderFields(professionalFields.slice(3), professionalForm, editProfessional, 'professional', professionalErrors)}   </Box>
        {editProfessional && (
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ px: 4, pb: 2 }}>
            <Button variant="outlined" onClick={() => handleCancel('professional')}>Cancelar</Button>
            <Button variant="contained" onClick={() => handleSave('professional')}>Guardar</Button>
          </Stack>
        )}
      </Box>
    </form>
  )
}