import {Box, Avatar,Typography, Grid,Button,useMediaQuery, useTheme} from '@mui/material';
  
  const menuItems = [
    { label: 'Perfil', link: '/profile' },
    { label: 'Mis pacientes', link: '/patients' },
    { label: 'Turnos', link: '/turns' },
  ];
  
  export const ProfileMenu = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
    const MenuButtons = ({ layout }: { layout: 'horizontal' | 'vertical' }) => {
      const buttonStyle = {
        color: 'var(--main-color)',
        fontWeight: 'bold',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'var(--primary-color)',
        },
      };
  
      if (layout === 'horizontal') {
        return (
          <Grid container >
            {menuItems.map((item) => (
              <Grid item xs={12} md={4} lg={3} key={item.label}>
                <Button fullWidth variant="text" href={item.link} sx={buttonStyle}>
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        );
      }
  
      return (
        <Grid container direction="column" alignItems="center">
          {menuItems.map((item) => (
            <Grid item key={item.label} sx={{ width: '10em' }}>
              <Button fullWidth variant="text" href={item.link} sx={buttonStyle}>
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      );
    };
  
    return (
      <Box
      sx={{
        width: '100%',
        maxWidth: {
          xs: '100%',   
          sm: '36em',  
          md: '44em',  
        },
          backgroundColor: 'var(--footer-color)',
          borderRadius: '1em',
          padding: '2em 1em',
          color: 'var(--main-color)',
          textAlign: 'center',
          mx: 'auto',
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Menú
        </Typography>
  
        {isMobile ? (
          <>
            <Avatar
              alt="Foto de perfil"
              sx={{
                width: 170,
                height: 170,
                margin: '0 auto',
                mb: 3,
              }}
            />
            <MenuButtons layout="horizontal" />
          </>
        ) : (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction={isTablet ? 'row' : 'column'}
          >
            <Grid item xs={12} sm={5} md={12}>
              <Avatar
                alt="Foto de perfil"
                sx={{
                  width: 200,
                  height: 200,
                  mx: 'auto',
                  mb: isTablet ? 0 : 3,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={12}>
              <MenuButtons layout="vertical" />
            </Grid>
          </Grid>
        )}
      </Box>
    );
  };
  
  export default ProfileMenu;
  