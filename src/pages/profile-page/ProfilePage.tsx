import { ProfileMenu } from "../../components/profile-menu/Profile-menu"
import { Box, Grid, Paper } from "@mui/material";
import ProfileForm from "../../components/user-form-component/User-form-component";

export const ProfilePage = () => {
  return (
    <Box
      sx={{
        px: { xs: '1em', md: '4em' },
        py: '2em',
        backgroundColor: 'var(--main-color)',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={18} md={3}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'var(--primary-color)',
              padding: '1em',
              height: '100%',
            }}
          >
            <ProfileMenu />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper
            elevation={8}
            sx={{
              backgroundColor: 'var(--header-color)',
              padding: '2em',
              
            }}
          >
            <ProfileForm userRole="veterinarian" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
);
};