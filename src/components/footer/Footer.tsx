import { Typography, Box } from '@mui/material';

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: 'var(--footer-color)',
      py: '1em',
      textAlign: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    }}
  >
    <Typography
      component="p"
      sx={{
        fontSize: '1em',
        fontWeight: 'bold',
        color: 'var(--main-color)',
      }}
    >
      VetApp - derechos reservados
    </Typography>
  </Box>
);
