import { Box, Typography, Grid, IconButton, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { CustomTextField } from './Custom-text-field';

interface FieldConfig {
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormSectionProps {
  title: string;
  fields: FieldConfig[];
  editable: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const FormSection = ({
  title,
  fields,
  editable,
  onToggleEdit,
  onSave,
  onCancel,
}: FormSectionProps) => (
  <Box sx={{ mb: '2em', backgroundColor: 'white', p: '2em', borderRadius: '0.5em' }}>
<Box
  sx={{
    display: 'flex',
    alignItems: '',
    justifyContent: 'flex-end',
    gap: '0.5em',
    mb: 2,
  }}
>      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--font-color)' }}>
        {title}
      </Typography>
      {!editable && (
        <IconButton onClick={onToggleEdit}>
          <EditIcon />
        </IconButton>
      )}
    </Box>

    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} sm={6} key={field.name}>
          <CustomTextField
            name={field.name}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            error={!!field.error}
            helperText={field.error}
            disabled={!editable}
          />
        </Grid>
      ))}
    </Grid>

    {editable && (
      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
<Button
  onClick={onCancel}
  variant="outlined"
  sx={{
    color: 'var(--primary-color)',
    borderColor: 'var(--primary-color)',
    fontWeight: 'bold',
    px: 2,
  }}
>          Cancelar
        </Button>
        <Button onClick={onSave} variant="contained" sx={{ backgroundColor: 'var(--footer-color)' }}>
          Guardar
        </Button>
      </Box>
    )}
  </Box>
);
