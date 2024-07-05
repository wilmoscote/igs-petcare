import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Stack, Avatar, Box, DialogActions, Grid, Button, Chip } from '@mui/material';
import { format } from 'date-fns';
import { formatAge } from 'utils/petUtils';

const BookingDetailModal = ({ open, handleClose, booking }) => {
    if (!booking) return null;

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
             <DialogTitle>
                <Stack direction="row" justifyContent={"space-between"} spacing={2} alignItems="center">
                    <Typography fontWeight={"bold"} variant="h5">Detalles de la Reserva</Typography>
                    <Chip label={booking.status === 'active' ? 'Activa' : 'Inactiva'} color={booking.status === 'active' ? 'success' : 'default'} />
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={booking.pets.img_profile} alt={booking.pets.name} />
                        <Box>
                            <Typography variant="h6" fontWeight={"bold"}>{booking.pets.name}</Typography>
                            {/* <Typography variant="body2" color="textSecondary">
                                {booking.pets.specie?.name || ""}, {booking.pets.breed?.name || ""}
                            </Typography> */}
                            <Typography variant="body2" color="textSecondary">
                                {booking.pets.gender === "male" ? "Macho" : "Hembra"} - {formatAge(booking.pets.birthday_date)}
                            </Typography>
                        </Box>
                    </Stack>
                    <Typography variant="body1">
                        <strong>Servicio:</strong> {booking.service.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Clínica:</strong> {booking.clinic.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Dirección:</strong> {booking.clinic.address}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Fecha:</strong> {format(new Date(booking.date), 'yyyy-MM-dd HH:mm:ss')}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Código de Reserva:</strong> {booking.booking_code}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Información Adicional:</strong> {booking.additional_info || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Contacto Adicional:</strong> {booking.additional_contact}
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Grid container justifyContent="end" alignItems="center">
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button onClick={handleClose} variant="contained" >
                                Volver
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default BookingDetailModal;
