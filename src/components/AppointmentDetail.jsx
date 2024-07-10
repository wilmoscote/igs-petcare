import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Stack, Button, Dialog } from '@mui/material';
import { format } from 'date-fns';
import { formatAge } from 'utils/petUtils';
import MainCard from './MainCard';
import { Man, Personalcard, Pet, TickCircle, Woman } from 'iconsax-react';
import { PopupTransition } from './@extended/Transitions';
import PetProfile from './PetProfile';
import { useState } from 'react';
import UserDetailModal from './UserDetailModal';
import AlertChangeBookingStatus from './AlertChangeBookingStatus';

const AppointmentDetail = ({ booking, onChange, selected }) => {
    const [petDialog, setPetDialog] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
  

    if (!booking) return null;

    // console.log(booking?.user)

    const handlePetDialogClose = () => setPetDialog(false)

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Información de la Mascota</Typography>
            <MainCard sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={booking.pets.img_profile} alt={booking.pets.name} />
                    <Box>
                        <Stack direction={"row"} spacing={1} alignItems="center">
                            <Typography variant="subtitle1" color={booking?.pets.gender === "male" ? "#2CCCE4" : "#F47373"} >{booking?.pets.name} {booking?.pets.gender === "male" ? <Man size="13" color={"#2CCCE4"} /> : <Woman size="13" color={"#F47373"} />}&nbsp;</Typography>
                            -
                            <Typography variant="body2" color="textSecondary">
                                {formatAge(booking.pets.birthday_date)}
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color="textSecondary">
                            {booking.pets.specie?.name || ""}, {booking.pets.breed?.name || ""}
                        </Typography>
                        <Button fullWidth variant="outlined" endIcon={<Pet variant='Bold' />} sx={{ fontWeight: "500", textTransform: "none", mt: 1 }} onClick={() => setPetDialog(true)}>Ver perfil de mascota</Button>
                    </Box>
                </Stack>
            </MainCard>

            <Typography variant="h5" gutterBottom>Información del Dueño</Typography>
            <MainCard sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar alt={booking.user?.name} />
                    <Box>
                        <Typography variant="body1"><strong>Nombre:</strong> {booking?.user?.name || "Usuario"}</Typography>
                        <Typography variant="body1"><strong>Dirección:</strong> {booking?.user?.address || ""}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {booking?.user?.email || ""}</Typography>
                        <Typography variant="body1"><strong>Teléfono:</strong> {booking?.user?.phone || ""}</Typography>
                        <Button variant="outlined" endIcon={<Personalcard variant='Bold' />} sx={{ fontWeight: "500", textTransform: "none", mt: 1 }} onClick={() => setIsModalOpen(true)}>Ver perfil de dueño</Button>
                    </Box>
                </Stack>
            </MainCard>

            <Typography variant="h5" gutterBottom>Información</Typography>
            <MainCard sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>ID# {booking.booking_code}</Typography>
                <Typography variant="body1" gutterBottom>Servicio: <strong>{booking.service.name} </strong></Typography>
                <Typography variant="body1" gutterBottom>Fecha: <strong>{format(new Date(booking.date), 'yyyy-MM-dd HH:mm:ss')}</strong></Typography>
                <Typography variant="body1" gutterBottom>Información Adicional: <strong>{booking.additional_info || 'N/A'}</strong></Typography>
                <Typography variant="body1">Contacto Adicional:<strong> {booking?.additional_contact}</strong></Typography>
            </MainCard>

            <Button fullWidth variant="contained" color="success" endIcon={<TickCircle variant="Bold" />} sx={{ fontWeight: "600", textTransform: "none" }} onClick={() => setOpenAlert(true)}>Marcar como cumplida</Button>
            <Dialog
                maxWidth="md"
                fullWidth
                TransitionComponent={PopupTransition}
                onClose={handlePetDialogClose}
                open={petDialog}
                sx={{ '& .MuiDialog-paper': { p: 0 } }}
            >
                <PetProfile onCancel={handlePetDialogClose} pet={booking?.pets} />
            </Dialog>
            <UserDetailModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} user={booking?.user} />
            <AlertChangeBookingStatus booking={booking} open={openAlert} handleClose={handleAlertClose} onChange={onChange} />
        </Box >
    );
};

export default AppointmentDetail;