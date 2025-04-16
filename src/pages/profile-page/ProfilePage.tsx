import { ProfileMenu } from "../../components/profile-menu/Profile-menu"
import { Box, Grid } from "@mui/material";
import ProfileForm from "../../components/user-form-component/User-form-component";

export const ProfilePage = () => {
  return (
    <Box sx={{ px: { xs: '1em', md: '4em' }, py: '2em' }}>
    <Grid container >
      <Grid item xs={12} md={3}>
        <ProfileMenu />
      </Grid>
<ProfileForm userRole="veterinarian"/>
      
    </Grid>
  </Box>
);
};