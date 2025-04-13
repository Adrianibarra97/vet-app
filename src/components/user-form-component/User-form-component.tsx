import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { FormSection } from './Form-section';

export const UserFormComponent = () => {
  const [editablePersonal, setEditablePersonal] = useState(false);
  const [editableProfesional, setEditableProfesional] = useState(false);

  const initialData = {
    nombre: '',
    apellido: '',
    email: '',
    celular: '',
    direccion: '',
    telefono: '',
    matricula: '',
    especialidad: '',
    emailProfesional: '',
    telefonoLaboral: '',
    direccionLaboral: '',
    horarioAtencion: ''
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (key: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [key]: e.target.value });
  };

  const validateFields = (fields: (keyof typeof data)[]) => {
    const newErrors: { [key: string]: string } = {};
    fields.forEach((key) => {
      if (!data[key].trim()) newErrors[key] = 'Este campo es obligatorio';
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const savePersonal = () => {
    const personalKeys = ['nombre', 'apellido', 'email', 'celular', 'direccion', 'telefono'] as const;
    if (validateFields([...personalKeys])) {
      setEditablePersonal(false);
    }
  };

  const saveProfesional = () => {
    const profKeys = [
      'matricula',
      'especialidad',
      'emailProfesional',
      'telefonoLaboral',
      'direccionLaboral',
      'horarioAtencion'
    ] as const;
    if (validateFields([...profKeys])) {
      setEditableProfesional(false);
    }
  };

  const cancelEditPersonal = () => {
    setEditablePersonal(false);
    setErrors({});
  };

  const cancelEditProfesional = () => {
    setEditableProfesional(false);
    setErrors({});
  };

  const createFields = (keys: (keyof typeof data)[]) =>
    keys.map((key) => ({
      name: key,
      label: key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .replace('Profesional', ' profesional'),
      value: data[key],
      onChange: handleChange(key),
      error: errors[key],
    }));

  return (
    <Grid container spacing={2} sx={{ px: 3 }}>
      <Grid item xs={0} md={3} />
      <Grid item xs={12} md={13}>
        <Box component="form" noValidate autoComplete="off">
          <FormSection
            title="Información Personal"
            fields={createFields(['nombre', 'apellido', 'email', 'celular', 'direccion', 'telefono'])}
            editable={editablePersonal}
            onToggleEdit={() => setEditablePersonal(true)}
            onSave={savePersonal}
            onCancel={cancelEditPersonal}
          />

          <FormSection
            title="Información Profesional"
            fields={createFields([
              'matricula',
              'especialidad',
              'emailProfesional',
              'telefonoLaboral',
              'direccionLaboral',
              'horarioAtencion'
            ])}
            editable={editableProfesional}
            onToggleEdit={() => setEditableProfesional(true)}
            onSave={saveProfesional}
            onCancel={cancelEditProfesional}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
