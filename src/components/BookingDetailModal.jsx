import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography, Button, Avatar, Chip, Box, Divider, Grid } from '@mui/material';
import { format } from 'date-fns';
import { formatAge } from 'utils/petUtils';
import { Man, TickCircle, Woman } from 'iconsax-react';
import AlertChangeBookingStatus from './AlertChangeBookingStatus';
import { useState } from 'react';

const BookingDetailModal = ({ open, onCancel, event, onChange }) => {
    const theme = useTheme();
    const [openAlert, setOpenAlert] = useState(false);
    if (!event) return null;

    const endDate = new Date(event.start);
    endDate.setHours(endDate.getHours() + 1);

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };

    const handleStateUpdate = () => {
        onChange()
        onCancel()
    }

    return (
        <Dialog open={open} onClose={onCancel} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" justifyContent={"space-between"} spacing={2} alignItems="center">
                    <Typography fontWeight={"bold"} variant="h5">Detalles de la Reserva</Typography>
                    <Chip label={event.extendedProps.status === 'active' ? 'Activa' : 'Cumplida'} color={event.extendedProps.status === 'active' ? 'success' : "info"} />
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={event.extendedProps.pets.img_profile} alt={event.extendedProps.pets.name} />
                        <Box>
                            <Stack direction={"row"} spacing={1} alignItems="center">
                                <Typography variant="subtitle1" color={event.extendedProps?.pets.gender === "male" ? "#2CCCE4" : "#F47373"} >{event.extendedProps?.pets.name} {event.extendedProps?.pets.gender === "male" ? <Man size="13" color={"#2CCCE4"} /> : <Woman size="13" color={"#F47373"} />}&nbsp;</Typography>
                            </Stack>
                            <Typography variant="body2" color="textSecondary">
                                {formatAge(event.extendedProps.pets.birthday_date)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {event.extendedProps.pets.specie?.name || ""}, {event.extendedProps.pets.breed?.name || ""}
                            </Typography>
                        </Box>
                    </Stack>

                    <Typography variant="body1">
                        <strong>Servicio:</strong> {event.title}
                    </Typography>
                    {/* <Typography variant="body1">
                        <strong>Clínica:</strong> {event.extendedProps.clinic.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Dirección:</strong> {event.extendedProps.clinic.address}
                    </Typography> */}
                    <Typography variant="body1">
                        <strong>Fecha:</strong> {format(new Date(event.start), 'dd MMM, yyyy hh:mm a')}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Fin:</strong> {format(endDate, 'dd MMM, yyyy hh:mm a')}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Código de Reserva:</strong> {event.extendedProps.booking_code}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Información Adicional:</strong> {event.extendedProps.additionalInfo || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Contacto Adicional:</strong> {event.extendedProps.contact}
                    </Typography>
                    <Divider />
                    <Typography variant="h6" fontWeight={"bold"}>Información del Dueño</Typography>
                    <Typography variant="body1">
                        <strong>Nombre:</strong> {event.extendedProps.user.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Teléfono:</strong> {event.extendedProps.user.phone}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Dirección:</strong> {event.extendedProps.user.address}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {event.extendedProps.user.email}
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Grid container justifyContent={event.extendedProps.status === 'active' ? "space-between" : "end"} alignItems="center">
                    {event.extendedProps.status === 'active' && (
                        <Grid item>
                            <Button fullWidth variant="contained" color="success" endIcon={<TickCircle variant="Bold" />} sx={{ fontWeight: "600", textTransform: "none" }} onClick={() => setOpenAlert(true)}>Marcar como cumplida</Button>
                        </Grid>
                    )}
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button onClick={onCancel} variant="contained">
                                Volver
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
            <AlertChangeBookingStatus booking={event.extendedProps.booking} open={openAlert} handleClose={handleAlertClose} onChange={handleStateUpdate} />
        </Dialog>
    );
};

export default BookingDetailModal;