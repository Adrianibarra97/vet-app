import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import { FaCaretDown, FaPen } from 'react-icons/fa'
import './User-form-component.css'
const personalFields = [
  'Nombre',
  'Apellido',
  'DNI',
  'Dirección',
  'Email',
  'Username',
  'Celular',
  'Teléfono fijo',
]

const professionalFields = [
  'Matrícula',
  'Teléfono Laboral',
  'Especialidad',
  'Dirección Laboral',
  'Email Profesional',
  'Horario de atención',
]

const renderFields = (fields: string[], disabled: boolean) =>
  fields.map((field, index) => (
    <div className="data__item" key={index}>
      <label className="data__item--label">{field}</label>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        className="data__item--input"
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
      />
    </div>
  ))

export const ProfileForm = () => {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editProfessional, setEditProfessional] = useState(false)

  const cancelEdit = (section: 'personal' | 'professional') => {
    if (section === 'personal') setEditPersonal(false)
    else setEditProfessional(false)
  }

  return (
    <form className="data">
      <Box className="data__section" id="section__2"sx={{ height: { md: '30em' } }}
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

        <>
          <Box className="section__content" 
          >
            <Box className="section__items">
              {renderFields(personalFields.slice(0, 4), !editPersonal)}
            </Box>
            <Box className="section__items">
              {renderFields(personalFields.slice(4), !editPersonal)}
            </Box>
          </Box>

          {editPersonal && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'flex-end', px: 4, pb: 2, mt: 1.4 }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: 'var(--font-color)',
                  borderColor: 'var(--footer-color)',
                  '&:hover': { borderColor: 'var(--primary-color)' },
                }}
                onClick={() => cancelEdit('personal')}
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
              >
                Guardar
              </Button>
            </Stack>
          )}
        </>
      </Box>

      <Box className="data__section" id="section__2"sx={{ height: { md: '25em' } }}>
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

        <>
          <Box className="section__content">
            <Box className="section__items">
              {renderFields(professionalFields.slice(0, 3), !editProfessional)}
            </Box>
            <Box className="section__items">
              {renderFields(professionalFields.slice(3), !editProfessional)}
            </Box>
          </Box>

          {editProfessional && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'flex-end', px: 4, pb: 2, mt: 2}}
            >
              <Button
                variant="outlined"
                sx={{
                  color: 'var(--font-color)',
                  borderColor: 'var(--footer-color)',
                  '&:hover': { borderColor: 'var(--primary-color)' },
                }}
                onClick={() => cancelEdit('professional')}
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
              >
                Guardar
              </Button>
            </Stack>
          )}
        </>
      </Box>
    </form>
  )
}
