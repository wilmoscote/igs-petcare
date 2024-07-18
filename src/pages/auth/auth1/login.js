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
import AuthWrapper2 from 'sections/auth/AuthWrapper2';

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
    <AuthWrapper2>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {/* <Logo /> */}
          <img src={IgsLogo} alt="IGS Logo" width={60} style={{ marginBottom: "-10px" }} />
        </Grid>
        <Grid item xs={12}>
          <Stack justifyContent="baseline" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" mb={0.3}>Iniciar sesión</Typography>
            <Typography variant="body">Clínicas</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLoginClinic forgot="/auth/forgot-password" />
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
};

export default Login;

