import { ProfileMenu } from "../../components/profile-menu/Profile-menu"
import { UserFormComponent } from "../../components/user-form-component/User-form-component"
import { Box, Grid } from "@mui/material";

export const ProfilePage = () => {
  return (
    <Box sx={{ px: { xs: '1em', md: '4em' }, py: '2em' }}>
    <Grid container >
      <Grid item xs={12} md={4}>
        <ProfileMenu />
      </Grid>

      <Grid item xs={12} md={8}>
        <UserFormComponent />
      </Grid>
    </Grid>
  </Box>
);
};