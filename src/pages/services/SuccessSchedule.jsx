import React from 'react'
import { Grid, Box, Typography, Button, Avatar, useTheme } from '@mui/material';
import { ArrowRight, TickCircle } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';

const SuccessSchedule = () => {
  const navigate = useNavigate();

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
      <Grid container spacing={4} sx={{ maxWidth: '1200px', width: '100%' }}>
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
              size="44"
              // color={"primary"}
              variant="Bold"
              className='mb-4'
            />
            <Typography variant="h4" component="h1" gutterBottom>
             Exito
            </Typography>
            <Typography variant="body1" color={"primary"} paragraph sx={{ my: 1 }}>
             Se agendo
            </Typography>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              sx={{ mt: 2, px: 2, py: 1, textTransform: 'none' }}
              onClick={() => navigate("/dashboard")}
              disableElevation
            >
             Volver al inicio
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ borderLeft: { md: '1px solid #e0e0e0' }, pl: { md: 4 }, pt: { xs: 4, md: 0 } }}>
            {/* <TicketSummary ticket={ticket} headerDivider={false} /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SuccessSchedule