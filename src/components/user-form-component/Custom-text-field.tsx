import { TextField } from '@mui/material';
interface CustomTextFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    name?: string;
    disabled?: boolean;
  }
  
  export const CustomTextField = ({
    label,
    value,
    onChange,
    error,
    helperText,
    name,
    disabled,
  }: CustomTextFieldProps) => (
    <TextField
      fullWidth
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      variant="outlined"
      size="small"
      disabled={disabled}
      InputLabelProps={{ shrink: true }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'var(--primary-color)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--primary-color)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--primary-color)',
          },
          backgroundColor: disabled ? '#f0f0f0' : 'white',
        },
        '& input': {
          color: 'black',
          padding: '0.8em',
          fontSize: '1em',
        },
       '& label': {
  color: 'var(--primary-color)',
  fontSize: '1em',
  padding: '2.1.75em',  
  transform: 'translate(14px, -3px) scale(0.75)',},
        '& label.Mui-focused': {
          color: 'var(--primary-color)',
        },
      }}
    />
  );
  