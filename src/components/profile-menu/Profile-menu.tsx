import { Box, Typography, Avatar, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import '../profile-menu/Profile-menu.css';

export const ProfileMenu = () => {
  return (
 <Box className="main">
   
    <Box className="content__menu">
      <Typography variant="h6" className="menu__title">Menú</Typography>

      <nav className="menu">
        <Box className="menu--image">
          <Avatar
            alt="Foto de perfil"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </Box>

        <Stack component="ul" className="menu__ul">
          <Link className="menu__ul--link" to="/profile">Perfil</Link>
          <Link className="menu__ul--link" to="/patients">Mis pacientes</Link>
          <Link className="menu__ul--link" to="/turns">Turnos</Link>
        </Stack>
      </nav>
    </Box>
  
  </Box>

  );
};
