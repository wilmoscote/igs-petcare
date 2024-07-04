import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { Eye, EyeSlash } from 'iconsax-react';
import AuthCodeModal from 'components/AuthCodeModal';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ============================|| JWT - LOGIN ||============================ //

const AuthLogin = ({ forgot }) => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("")
  const { createOtp, login } = useAuth();
  const scriptedRef = useScriptRef();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          identification: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Ingrese un correo válido').max(255).required('Ingrese un correo electrónico'),
          identification: Yup.string().min(5).required('Ingrese un número de identificación'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setError(null)
          try {
            setEmail(values.email)
            setDni(values.identification)
            const response = await createOtp(values.email, values.identification)
            // console.log(response.data)
            if (response.data.success) {
              setOpen(true);
              dispatch(
                openSnackbar({
                  open: true,
                  message: response.data.message,
                  variant: 'success',
                  alert: {
                    color: 'success'
                  },
                  close: true
                })
              );
              // alert(response.data.message)
            } else {
              dispatch(
                openSnackbar({
                  open: true,
                  message: response.data.message,
                  variant: 'error',
                  alert: {
                    color: 'error'
                  },
                  close: true
                })
              );
              setError(response.data.message)
              // alert(response.data.message)
            }
          } catch (error) {
            console.error(error)
          } 

          // try {
          //   setOpen(true)
          //   await login(values.email, values.identification);
          //   if (scriptedRef.current) {
          //     setStatus({ success: true });
          //     setSubmitting(false);
          //   }
          // } catch (err) {
          //   console.error(err);
          //   if (scriptedRef.current) {
          //     setStatus({ success: false });
          //     setErrors({ submit: err.message });
          //     setSubmitting(false);
          //   }
          // }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Correo electrónico</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Ingrese su correo electrónico"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Identificación</InputLabel>
                  <OutlinedInput
                    id="identification-login"
                    type="identification"
                    value={values.identification}
                    name="identification"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Ingrese su número de identificación"
                    fullWidth
                    error={Boolean(touched.identification && errors.identification)}
                  />
                  {touched.identification && errors.identification && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.identification}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              {error && (
                <Grid item xs={12}>
                  <FormHelperText error>{error}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Iniciar sesión
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <AuthCodeModal open={open} handleClose={handleClose} email={email} dni={dni} />
    </>
  );
};

AuthLogin.propTypes = {
  forgot: PropTypes.string
};

export default AuthLogin;
