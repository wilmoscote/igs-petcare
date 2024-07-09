import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Dialog, Grid, Stack, Typography } from '@mui/material';

// project-imports
import Logo from 'components/logo';
import useAuth from 'hooks/useAuth';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLoginClinic from 'sections/auth/auth-forms/AuthLoginClinic';
import IgsLogo from 'assets/images/auth/igsLogo.svg';

// assets
import imgFacebook from 'assets/images/auth/facebook.svg';
import imgTwitter from 'assets/images/auth/twitter.svg';
import imgGoogle from 'assets/images/auth/google.svg';
import PetProfile from 'components/PetProfile';
// import OwnerProfile from 'components/OwnerProfile'
import { useState } from 'react';
import { PopupTransition } from 'components/@extended/Transitions';
import useClinicStore from 'store/useClinicStore';
import { useEffect } from 'react';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const navigate = useNavigate()

  const { user } = useClinicStore();

  useEffect(() => {
    if (user) {
      navigate("/clinic/dashboard/home")
    }
  }, [user])

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <img src={IgsLogo} alt="IGS Logo" width={60} style={{ marginBottom: "-10px" }} />
        </Grid>
        {/* <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgFacebook} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Facebook
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgTwitter} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Twitter
              </AuthSocButton>
            </Grid>
            <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgGoogle} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Google
              </AuthSocButton>
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item xs={12}>
          <AuthDivider>
            <Typography variant="body1">OR</Typography>
          </AuthDivider>
        </Grid> 
        
        aquavet@admin.com
        */}
        <Grid item xs={12}>
          <Stack justifyContent="left" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" mb={0.5}>Inicio de sesión</Typography>
            <Typography variant="body1">Clínicas</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLoginClinic forgot="/auth/forgot-password" />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;

