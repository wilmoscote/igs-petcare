import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Stack } from '@mui/material';
import { format } from 'date-fns';
import { formatAge } from 'utils/petUtils';
import MainCard from './MainCard';
import { Man, Woman } from 'iconsax-react';

const AppointmentDetail = ({ booking }) => {
    if (!booking) return null;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Información de la Mascota</Typography>
            <MainCard sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={booking.pets.img_profile} alt={booking.pets.name} />
                    <Box>
                        <Typography variant="subtitle1" color={booking?.pets.gender === "male" ? "#2CCCE4" : "#F47373"} >{booking?.pets.name} {booking?.pets.gender === "male" ? <Man size="13" color={"#2CCCE4"} /> : <Woman size="13" color={"#F47373"} />} </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {formatAge(booking.pets.birthday_date)}
                        </Typography>
                        {/* <Typography variant="body2" color="textSecondary">
                            {booking.pets.specie?.name || ""}, {booking.pets.breed?.name || ""}
                        </Typography> */}
                    </Box>
                </Stack>
            </MainCard>

            <Typography variant="h5" gutterBottom>Información del Dueño</Typography>
            <MainCard sx={{ mb: 3 }}>
                <Typography variant="body1"><strong>Nombre:</strong> {booking?.user?.name || "Usuario"}</Typography>
                <Typography variant="body1"><strong>Contacto:</strong> {booking?.additional_contact}</Typography>
            </MainCard>

            <Typography variant="h5" gutterBottom>Información</Typography>
            <MainCard sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>ID# {booking.booking_code}</Typography>
                <Typography variant="body1" gutterBottom><strong>Servicio:</strong> {booking.service.name}</Typography>
                <Typography variant="body1" gutterBottom><strong>Clínica:</strong> {booking.clinic.name}</Typography>
                <Typography variant="body1" gutterBottom><strong>Dirección:</strong> {booking.clinic.address}</Typography>
                <Typography variant="body1" gutterBottom><strong>Fecha:</strong> {format(new Date(booking.date), 'yyyy-MM-dd HH:mm:ss')}</Typography>
                <Typography variant="body1" gutterBottom><strong>Información Adicional:</strong> {booking.additional_info || 'N/A'}</Typography>
                <Typography variant="body1" gutterBottom><strong>Contacto Adicional:</strong> {booking.additional_contact}</Typography>
            </MainCard>


        </Box>
    );
};

export default AppointmentDetail;