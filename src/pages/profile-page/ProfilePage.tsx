import { ProfileMenu } from '../../components/profile-menu/Profile-menu'
import { Box, Grid } from '@mui/material'
import ProfileForm from '../../components/user-form-component/User-form-component'

export const ProfilePage = () => {
  return (
    <Box sx={{ backgroundColor: 'var(--main-color)' }}>
      <Grid container spacing={2}>
        <Grid item xs={14} md={3}>
          <ProfileMenu />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProfileForm userRole="veterinarian" />
        </Grid>
      </Grid>
    </Box>
  )
}
