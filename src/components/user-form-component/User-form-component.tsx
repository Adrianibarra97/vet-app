import {
  Stack,
  Button,
  Typography,
  TextField,
  Grid,
  Box,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

export default function ProfileForm() {
  const [editingPersonal, setEditingPersonal] = useState(false)
  const [editingProfessional, setEditingProfessional] = useState(false)

  const personalFields = [
    'Nombre',
    'Email',
    'Apellido',
    'Username',
    'DNI',
    'Celular',
    'Dirección',
    'Teléfono Fijo',
  ]

  const professionalFields = [
    'Matrícula',
    'Teléfono Laboral',
    'Especialidad',
    'Dirección Laboral',
    'Email Profesional',
    'Horario de atención',
  ]

  const renderFields = (fields: string[]) => (
    <Grid container spacing={2}>
      {fields.map((label) => (
        <Grid item xs={12} sm={6} >
          <TextField
            label={label}
            fullWidth
            variant="standard"
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: 'var(--footer-color)',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--footer-color)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--footer-color)',
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
  const renderActions = (
    editing: boolean,
    onSave: () => void,
    onCancel: () => void,
  ) =>
    editing && (
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          sx={{
            color: 'var(--footer-color)',
            borderColor: 'var(--footer-color)',
            '&:hover': {
              backgroundColor: '#c5e7dc',
            },
          }}
        >
          CANCELAR
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          sx={{
            backgroundColor: 'var(--footer-color)',
            color: 'var(--main-color)',
            '&:hover': {
              backgroundColor: '#459a88',
            },
          }}
        >
          GUARDAR
        </Button>
      </Stack>
    )

  return (
    <Box className="body">
      <Box className="main">
        <div className="main__title"> Perfil</div>
          <div className="main__content--filter"></div>
          <div className="main__content--data">
          <Box
  className="data"

>
       <Box className="data__section">
                <Box className="section__header" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    className="section__header--title" sx={{ fontSize: '1.5em' }}>
                    Informacion Personal
                  </Typography>
                  <IconButton onClick={() => setEditingPersonal(true)}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box>
                  {renderFields(personalFields)}
                  {renderActions(
                    editingPersonal,
                    () => setEditingPersonal(false),
                    () => setEditingPersonal(false),
                  )}
                </Box>
              </Box>

              <Box className="data__section">
                <Box className="section__header" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    className="section__header--title" sx={{ fontSize: '1.5em' }}>
                    Informacion Profesional
                  </Typography>
                  <IconButton onClick={() => setEditingProfessional(true)}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box>
                  {renderFields(professionalFields)}
                  {renderActions(
                    editingProfessional,
                    () => setEditingProfessional(false),
                    () => setEditingProfessional(false),
                  )}
                </Box>
              </Box>
            </Box>
          </div>
      </Box>
    </Box>
  )
}
