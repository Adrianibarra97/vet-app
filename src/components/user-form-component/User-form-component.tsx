import {  Stack,Button, Typography, TextField, Grid, Box, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

interface ProfileFormProps {
  userRole: string; 
}

export default function ProfileForm({ userRole }: ProfileFormProps) {
  const isVet = userRole === 'veterinarian';
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState(false);


  const personalFields = [
    'Nombre',
    'Email',
    'Apellido',
    'Username',
    'DNI',
    'Celular',
    'Dirección',
    'Teléfono Fijo'
  ];

  const professionalFields = [
    'Matrícula',
    'Teléfono Laboral',
    'Especialidad',
    'Dirección Laboral',
    'Email Profesional',
    'Horario de atención'
  ];

  const renderFields = (fields: string[]) => (
    <Grid container spacing={2}>
      {fields.map((label) => (
        <Grid item xs={12} sm={6} >
          <TextField label={label}  fullWidth variant="standard"  />
        </Grid>
      ))}
    </Grid>
  );
  const renderActions = (editing: boolean, onSave: () => void, onCancel: () => void) =>
    editing && (
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{
            color: 'var(--footer-color)',
            borderColor: 'var(--footer-color)',
            '&:hover': {
              backgroundColor: '#c5e7dc'
            }}}>
          CANCELAR
        </Button>
        <Button variant="contained" color="primary" onClick={onSave} sx={{
            backgroundColor: 'var(--footer-color)',
            color: 'var(--main-color)',
            '&:hover': {
              backgroundColor: '#459a88'
            }
          }}>
          GUARDAR
        </Button>
      </Stack>
    );

  return (
    <Box    sx={{
      backgroundColor: 'var(--main-color)',
      color: 'var(--font-color)',
      padding: '1em',
      borderRadius: '8px'
    }}>
        <Box sx={{ mt: 2, color: 'var(--font-color)', padding: "1em"}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography  variant="subtitle1" fontWeight="bold" padding={"1em"} fontSize={"1.2em"}>
               Informacion Personal 
          </Typography >
          <IconButton onClick={() => setEditingPersonal(true)}>
          <EditIcon />
          </IconButton>
        </Box>
        <Box>{renderFields(personalFields)}
          {renderActions(editingPersonal, () => setEditingPersonal(false), () => setEditingPersonal(false))}
        </Box>
        </Box>

      {isVet && (
        <Box sx={{ mt: 2, color: 'var(--font-color)', padding: "1em"}}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold" padding={"1em"} fontSize={"1.2em"}>
                 Informacion Profesional          
                   </Typography>
                   <IconButton onClick={() => setEditingProfessional(true)}>
              <EditIcon />
            </IconButton>
          </Box>
          <Box>{renderFields(professionalFields)}
            {renderFields(professionalFields)}
            {renderActions(
              editingProfessional,
              () => setEditingProfessional(false),
              () => setEditingProfessional(false)
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
