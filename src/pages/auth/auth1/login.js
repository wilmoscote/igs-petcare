import { Link } from 'react-router-dom';

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
import OwnerProfile from 'components/OwnerProfile'
import { useState } from 'react';
import { PopupTransition } from 'components/@extended/Transitions';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const { isLoggedIn } = useAuth();

  const [open, setOpen] = useState(true);
  const data = JSON.stringify({
    "id": 2,
    "uuid": "01907a32-290a-71d7-b58d-3a3a8334054c",
    "name": "V\u00e9nus",
    "img_profile": "https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp",
    "specie_id": 2,
    "breed_id": 9,
    "user_id": 3,
    "gender": "Hembra",
    "birthday_date": "2018-09-11",
    "deleted_at": null,
    "created_at": "2024-07-03T20:03:46.000000Z",
    "updated_at": "2024-07-03T21:00:29.000000Z",
    "specie": {
      "id": 2,
      "name": "Perro",
      "uuid": "0190797f-6809-71c0-a233-70cfdec4a054",
      "name_alias": "perro",
      "deleted_at": null,
      "created_at": "2024-07-03T16:48:31.000000Z",
      "updated_at": "2024-07-03T16:48:31.000000Z"
    },
    "breed": {
      "id": 9,
      "name": "Beagle",
      "uuid": "0190797f-680e-70a1-a639-ba9607c61a72",
      "name_alias": "beagle",
      "specie_id": 2,
      "deleted_at": null,
      "created_at": "2024-07-03T16:48:31.000000Z",
      "updated_at": "2024-07-03T16:48:31.000000Z"
    }
  })

  const ownerData =  JSON.stringify(
    {
      "id": 3,
       "name": "Owner Test",
       "uuid": "0190759a-e37b-7262-99f4-3cbd5789",
      "email": "owner@test.com",
       "email_verified_at": null,
       "status": "ACTIVE",
      "dni": "987654321",
       "otp_code": null,
      "phone": "3214569874",
       "address": "Calle 3 No 3-33",
      "user_type_id": 1,
      "deleted_at": null,
      "created_at": "2024-07-02T22:40:03.000000Z",
      "updated_at": "2024-07-08T17:20:11.000000Z",
      "rol": [],
      "roles": []
     }
  )

  const [pet, setPet] = useState(JSON.parse(data));
  const [owner, setOwner] = useState (JSON.parse(ownerData))

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        </Grid> */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            {/* <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography> */}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLoginClinic forgot="/auth/forgot-password" />
        </Grid>
      </Grid>

      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleClose}
        open={open}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <PetProfile pet={pet} onCancel={handleClose} />
        <OwnerProfile owner={owner} onCancel={handleClose}></OwnerProfile>
      </Dialog>
    </AuthWrapper>
  );
};

export default Login;

