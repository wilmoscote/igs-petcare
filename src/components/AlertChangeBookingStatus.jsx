import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project-imports
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { TickCircle, Trash } from 'iconsax-react';
import { useState } from 'react';
import LoadingButton from 'components/@extended/LoadingButton';
import useAuth from 'hooks/useAuth';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertChangeBookingStatus({ booking, open, handleClose, onChange }) {
    const [loading, setLoading] = useState(false)
    const { changeBookingStatus } = useAuth();

    const handleChangeStatus = async () => {
        try {
            setLoading(true)
            const response = await changeBookingStatus(booking?.uuid, "inactive");
            if (response.data.success) {
                onChange()
                handleClose()
            } else {
                console.error('Error al cambiar el estado de la reserva.');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            TransitionComponent={PopupTransition}
            maxWidth="xs"
            aria-labelledby="column-delete-title"
            aria-describedby="column-delete-description"
        >
            <DialogContent sx={{ mt: 2, my: 1 }}>
                <Stack alignItems="center" spacing={3.5}>
                    <Avatar color="success" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
                        <TickCircle variant="Bold" />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h4" align="center">
                            ¿Está seguro que desea marcar la cita como cumplida?
                        </Typography>
                        <Typography align="center">
                            <Typography variant="h5" component="span">{booking?.service?.name || ""}
                            </Typography>
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                        <Button disabled={loading} fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
                            Cancelar
                        </Button>
                        <LoadingButton loading={loading} fullWidth color="success" variant="contained" onClick={handleChangeStatus} autoFocus sx={{textTransform: "none"}}>
                            Marcar como cumplida
                        </LoadingButton>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
