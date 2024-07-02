import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import OtpInput from 'react18-input-otp';
// import useSnackbarStore from '@store/useSnackbarStore';
import { useNavigate } from 'react-router-dom';
// import ApiRepository from '@services/apiRepository';
// import { useAuthStore } from '@store/useAuthStore';
import { LoadingButton } from '@mui/lab';

const AuthCodeVerification = ({ email }) => {
    const theme = useTheme();
    // const { setLogin, setUser, setManthisUser, setOtpUser, setCurrentCountry } = useAuthStore();
    const [otpError, setOtpError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendUsed, setResendUsed] = useState(false);
    const navigate = useNavigate();
    const [otp, setOtp] = useState();
    // const { showSnackbar } = useSnackbarStore();
    const borderColor = "#D9D9D9"

    const checkOtp = async () => {
        if (!otp || otp.length < 4) {
            // showSnackbar('Ingrese el código OTP.', 'error');
            setOtpError(true);
        } else {
            setOtpError(false);
            try {
                setLoading(true);
                // const response = await ApiRepository.validateOtp(email, otp);
                // console.log(response.data)
                // if (response.data.success) {
                //     setOtpUser(response.data?.data)
                //     if (response.data?.data?.country_name) {
                //         setCurrentCountry(findCountryByName(response.data?.data?.country_name)?.code)
                //     }
                //     findUser(response.data.token)
                // } else {
                //     setOtpError(true)
                //     showSnackbar(response.data.message, 'error');
                //     setLoading(false);
                // }
            } catch (err) {
                // showSnackbar(response.data.message, 'error');
                console.error(err)
                setLoading(false);
            }
        }
    }

    const handleResend = async () => {
        setResendLoading(true);
        try {
            // const response = await ApiRepository.createOtp(email);
            if (response.data.success) {
                // showSnackbar(response.data?.message, 'success');
                setResendUsed(true);
            } else {
                // showSnackbar(response.data?.message, 'error');
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
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography sx={{ mt: 2 }}>¿No has recibido el código?</Typography>
                    <LoadingButton variant="text" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer', textTransform: "none"}} color="primary" onClick={handleResend} loading={resendLoading} disabled={resendUsed}>
                        Reenviar código
                    </LoadingButton>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default AuthCodeVerification;