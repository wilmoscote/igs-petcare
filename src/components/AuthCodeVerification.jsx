import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import OtpInput from 'react18-input-otp';
// import useSnackbarStore from '@store/useSnackbarStore';
import { useNavigate } from 'react-router-dom';
// import ApiRepository from '@services/apiRepository';
// import { useAuthStore } from '@store/useAuthStore';
import { LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useAuthStore } from 'store/useAuthStore';

const AuthCodeVerification = ({ email, dni }) => {
    const theme = useTheme();
    const { validateOtp, login, createOtp } = useAuth();
    const { setLogin, setUser } = useAuthStore();
    const [otpError, setOtpError] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState(null);
    const [codeResendMessage, setCodeResendMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendUsed, setResendUsed] = useState(false);
    const navigate = useNavigate();
    const [otp, setOtp] = useState();
    // const { showSnackbar } = useSnackbarStore();
    const borderColor = "#D9D9D9"

    const checkOtp = async () => {
        setOtpErrorMessage(null)
        if (!otp || otp.length < 6) {
            // showSnackbar('Ingrese el código OTP.', 'error');
            setOtpErrorMessage("Ingrese el código OTP")
            setOtpError(true);
        } else {
            setOtpError(false);
            try {
                setLoading(true);
                const response = await validateOtp(email, dni, otp)
                console.log(response.data)
                if (response.data.success) {
                    setLogin(response.data?.token)
                    setUser(response.data?.data)
                    login(response.data?.data, response.data?.token)
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
                    setOtpErrorMessage(response.data?.message)
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
                    setOtpError(true)
                    // alert(response.data.message)
                }
            } catch (err) {
                // showSnackbar(response.data.message, 'error');
                console.error(err)
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    }

    const handleResend = async () => {
        setResendLoading(true);
        try {
            const response = await createOtp(email, dni)
            if (response.data.success) {
                // showSnackbar(response.data?.message, 'success');
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
                setCodeResendMessage(true)
                setResendUsed(true);
            } else {
                setOtpErrorMessage(response.data?.message)
                // showSnackbar(response.data?.message, 'error');
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
            }
        } catch (err) {
            console.error(err)
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <Grid container spacing={1} sx={{ px: { xl: 10 } }}>
            <Grid item xs={12}>
                <OtpInput
                    value={otp}
                    onChange={(otp) => {
                        setOtp(otp);
                        setOtpError(false);
                    }}
                    numInputs={6}
                    containerStyle={{ justifyContent: 'space-between' }}
                    inputStyle={{
                        width: '100%',
                        margin: '8px',
                        padding: '10px',
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 9,
                        ':hover': {
                            borderColor: theme.palette.primary.main
                        }
                    }}
                    hasErrored={otpError}
                    errorStyle={{
                        outline: 'none',
                        boxShadow: theme.shadows[1],
                        border: `1px solid rgb(239 68 68)`
                    }}
                    focusStyle={{
                        outline: 'none',
                        boxShadow: theme.shadows[1],
                        border: `1px solid ${theme.palette.primary.main}`
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton disableElevation fullWidth size="large" onClick={checkOtp} variant="contained" sx={{ textTransform: 'none' }} loading={loading}>
                    Continuar
                </LoadingButton>
            </Grid>
            <Grid item xs={12}>
                {codeResendMessage && (
                    <Typography variant="body1" mt={2} color="primary" fontWeight={"500"} textAlign="center">El código OTP se ha enviado nuevamente.</Typography>
                )}
                {otpErrorMessage && (
                    <Typography variant="body1" mt={2} color="error" textAlign="center">{otpErrorMessage}</Typography>
                )}
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography sx={{ mt: 2 }}>¿No has recibido el código?</Typography>
                    <LoadingButton variant="text" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer', textTransform: "none" }} color="primary" onClick={handleResend} loading={resendLoading} disabled={resendUsed}>
                        Reenviar código
                    </LoadingButton>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default AuthCodeVerification;