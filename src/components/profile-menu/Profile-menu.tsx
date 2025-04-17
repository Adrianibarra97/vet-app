import {Box,Avatar,Typography,List,ListItemButton,ListItemText,} from '@mui/material'

const menuItems = [
  { label: 'Perfil', link: '/profile' },
  { label: 'Mis pacientes', link: '/patients' },
  { label: 'Turnos', link: '/turns' },
]

export const ProfileMenu = () => {
  return (
    <Box
      sx={{width: '100%',backgroundColor: 'var(--footer-color)',borderRadius: '1em', padding: '2em 1em', color: 'var(--main-color)', textAlign: 'center' }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Menú
      </Typography>

      <Avatar
        alt="Foto de perfil"
        sx={{ width: { xs: 140, sm: 160, md: 200 },height: { xs: 140, sm: 160, md: 200 },  mb: 3, }}
      />

      <List
        sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'row', md: 'column' }, justifyContent: 'center', alignItems: 'center', gap: { xs: '0.5em', md: 0 }, }}
      >
        {menuItems.map((item) => (
          <ListItemButton key={item.label} href={item.link}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default ProfileMenu
