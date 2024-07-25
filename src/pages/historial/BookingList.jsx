import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Stack, Avatar, CircularProgress, Chip, useTheme } from '@mui/material';
import { format } from 'date-fns';
import useAuth from 'hooks/useAuth';
import { ArrowLeft, Man, Woman } from 'iconsax-react';
import { formatAge } from 'utils/petUtils';
import BookingDetailModal from './BookingDetailModal';
import { FormattedMessage } from 'react-intl';
import { ThemeMode } from 'config';
import { useNavigate } from 'react-router';

const BookingList = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('active');
    const { getBookingList } = useAuth();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchBookings = async (status) => {
        setLoading(true);
        try {
            const response = await getBookingList(status);
            // console.log(response.data.data.data)
            if (response.data.success) {
                setBookings(response.data?.data?.data?.reverse());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(filter);
    }, [filter]);

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    const handleCardClick = (booking) => {
        setSelectedBooking(booking);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedBooking(null);
    };

    const handleBack = () => {
        navigate("/dashboard")
    }

    return (
        <Box >
            <Typography variant="h2">
                <FormattedMessage id="my-reservations" />
            </Typography>
            {bookings && bookings?.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'end', my: 3 }}>
                    <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => handleFilterChange('active')} sx={{ mr: 2 }}>
                        Activas
                    </Button>
                    <Button variant={filter === 'inactive' ? 'contained' : 'outlined'} onClick={() => handleFilterChange('inactive')} sx={{ mr: 2 }}>
                        Cumplidas
                    </Button>
                </Box>
            )}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {bookings && bookings?.length > 0 ? (
                        <>
                            {bookings?.map((booking) => (
                                <Grid item xs={12} md={6} lg={4} key={booking.id} sx={{ mt: 1 }}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            height: "100%",
                                            borderRadius: 2,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleCardClick(booking)}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar src={booking.pets.img_profile} alt={booking.pets.name} />
                                                    <Box>
                                                        <Typography variant="subtitle1" color={booking.pets.gender === "male" ? "#2CCCE4" : "#F47373"} >{booking.pets.name} {booking.pets.gender === "male" ? <Man size="13" color={"#2CCCE4"} /> : <Woman size="13" color={"#F47373"} />} </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatAge(booking.pets.birthday_date) || ""}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                {filter === "active" ? (
                                                    <Chip label="Activa" color="success" />
                                                ) : (
                                                    <Chip label="Cumplida" />
                                                )}
                                            </Box>
                                            <Typography variant="body1" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} mb={0.5} mt={1}>
                                                Servicio: <span style={{ fontWeight: "600" }}> {booking.service?.name}</span>
                                            </Typography>
                                            <Typography variant="body1" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} mb={0.5}>
                                                Clínica: <span style={{ fontWeight: "600" }}> {booking.clinic?.name}</span>
                                            </Typography>
                                            <Typography variant="body1" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} mb={0.5}>
                                                Fecha: <span style={{ fontWeight: "600" }}> {format(new Date(booking.date), 'yyyy-MM-dd HH:mm:ss')}</span>
                                            </Typography>
                                            <Typography variant="body1" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} mb={0.5}>
                                                Código de Reserva: <span style={{ fontWeight: "600" }}>{booking.booking_code}</span>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <Grid item xs={12} md={12} sx={{ mt: 1 }}>

                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Card
                                    elevation={0}
                                    sx={{
                                        border: '2px dashed #E0E0E0',
                                        borderRadius: 2,
                                        padding: 3,
                                        textAlign: 'center',
                                        maxWidth: 600,
                                        margin: '0 auto'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h4" component="div" gutterBottom >
                                            No se encontró historial de reservas.
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" paragraph mb={4}>
                                            Cuando realice una reserva aquí aparecerá.
                                        </Typography>
                                        <Button startIcon={<ArrowLeft />} variant="contained" size="large" onClick={handleBack}>
                                            Volver
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            )}
            <BookingDetailModal
                open={modalOpen}
                handleClose={handleCloseModal}
                booking={selectedBooking}
            />
        </Box>
    );
};

export default BookingList;
