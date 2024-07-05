import React, { useState } from 'react';
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';
import { Check, CloseCircle, TickCircle } from 'iconsax-react';
import LoadingButton from 'components/@extended/LoadingButton';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import useAuth from 'hooks/useAuth';

const ConfirmSchedule = ({ loading, reservation, open, handleClose, onConfirm }) => {

    const handleConfirm = async () => {
        try {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Reserva confirmada exitosamente.',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            onConfirm();
            handleClose(true);
        } catch (error) {
            console.error(error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Error al confirmar la reserva.',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            TransitionComponent={PopupTransition}
            aria-labelledby="schedule-confirmation-title"
            aria-describedby="schedule-confirmation-description"
        >
            <DialogContent sx={{ mt: 2, my: 1, px: { xs: 1, md: 15 } }}>
                <Stack alignItems="center" spacing={3.5}>
                    <Avatar color="success" sx={{ width: 72, height: 72, fontSize: '2.75rem' }}>
                        <TickCircle variant="Bold" />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h4" align="center">
                            Confirmación
                        </Typography>
                        <Typography align="left">
                            <Typography variant="h5" component="span">Resumen de la Reserva:</Typography>
                        </Typography>
                        <Typography variant="body1" align="left">
                            Mascota: <span style={{ fontWeight: "bold" }}>{reservation.petName}</span>
                        </Typography>
                        <Typography variant="body1" align="left">
                            Servicio:  <span style={{ fontWeight: "bold" }}>{reservation.serviceName}</span>
                        </Typography>
                        <Typography variant="body1" align="left">
                            Clínica: <span style={{ fontWeight: "bold" }}>{reservation.clinicName}</span>
                        </Typography>
                        <Typography variant="body1" align="left">
                            Fecha: <span style={{ fontWeight: "bold" }}> {reservation.date}</span>
                        </Typography>
                        <Typography variant="body1" align="left">
                            Hora: <span style={{ fontWeight: "bold" }}> {reservation.time}</span>
                        </Typography>
                        <Typography variant="body1" align="left">
                            Contacto: <span style={{ fontWeight: "bold" }}>{reservation.phone}</span>
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                        <Button disabled={loading} fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
                            Cancelar
                        </Button>
                        <LoadingButton loading={loading} fullWidth color="primary" variant="contained" onClick={handleConfirm} autoFocus>
                            Confirmar
                        </LoadingButton>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmSchedule