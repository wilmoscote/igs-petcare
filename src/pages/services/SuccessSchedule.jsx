import React from 'react'
import { Grid, Box, Typography, Button, Avatar, useTheme } from '@mui/material';
import { ArrowRight, TickCircle } from 'iconsax-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import successDog1 from 'assets/images/success/success-dog-1.webp'
import successDog2 from 'assets/images/success/success-dog-2.webp'
import successDog3 from 'assets/images/success/success-dog-3.webp'
import successDog4 from 'assets/images/success/success-dog-4.webp'
import { useState } from 'react';
import { useEffect } from 'react';

const SuccessSchedule = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const images = [successDog1, successDog2, successDog3, successDog4];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  if(!bookingId){
    return <Navigate to="/dashboard" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        height: '80vh',
        padding: 4,
        boxSizing: 'border-box',
        mt: { xs: 5, sm: 0, md: 0, lg: 0, xl: 10 }
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: '1200px', width: '100%', backgroundColor: "white", pl: 5, borderRadius: 4 }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <TickCircle
              size="60"
              variant="Bold"
              color={theme.palette.primary.main}
            />
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, fontWeight: "bold" }}>
              ¡Reserva Exitosa!
            </Typography>
            <Typography variant="body1" paragraph sx={{ my: 1, fontWeight: "500" }}>
              Tu cita ha sido agendada exitosamente. Estamos emocionados de recibir a tu mascota y brindarle el mejor cuidado posible.
              Revisa tu correo electrónico para obtener los detalles de la reserva.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph mt={0.5}>
              Si necesitas realizar algún cambio o cancelar la cita, no dudes en ponerte en contacto con nosotros.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              sx={{ my: 2, px: 2, py: 1, textTransform: 'none' }}
              onClick={() => navigate("/dashboard")}
              disableElevation
            >
              Volver al inicio
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
              src={randomImage}
              alt="Happy Puppy"
              style={{ maxWidth: '100%', maxHeight: "400px", borderRadius: '8px' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuccessSchedule;