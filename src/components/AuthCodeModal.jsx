import { Backdrop, Button, Divider, Fade, CardContent, Modal, Stack, Typography, IconButton, useTheme } from '@mui/material';
import AuthCodeVerification from './AuthCodeVerification';
import { CloseCircle, CloseSquare } from 'iconsax-react'
import MainCard from './MainCard';


const AuthCodeModal = ({ open, handleClose, email }) => {
    const theme = useTheme();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            keepMounted
            closeAfterTransition
            onClose={() => { }}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
            onBackdropClick={() => { }}
            disableEscapeKeyDown
        >
            <Fade in={open}>
                <MainCard modal sx={{ maxWidth: { sm: "50%", md: "50%", xl: "35%" } }}>
                    <Stack direction="row" justifyContent="flex-end" sx={{ px: 2.5, py: 1 }}>
                        <IconButton onClick={handleClose}>
                            <CloseSquare color={theme.palette.primary.main} />
                        </IconButton>
                    </Stack>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: "28px" }} textAlign="center">Código OTP</Typography>
                    <Typography variant="body1" sx={{ mb: "28px" }} textAlign="center">Se ha enviado un código OTP a la dirección: <span style={{color: theme.palette.primary.main}} >{email || "example@igroupsolution.com"}</span>, por favor revisa el correo para validar el acceso.</Typography>
                    <Stack sx={{ mb: 4 }}>
                        <AuthCodeVerification email={email} />
                    </Stack>
                </MainCard>
            </Fade>
        </Modal>
    )
}

export default AuthCodeModal