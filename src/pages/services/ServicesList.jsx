import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Box, Button, useTheme, OutlinedInput, InputAdornment } from '@mui/material';
import { Health, Briefcase, Worm, ShieldTick, Microchip, Scissors, Scissor, SearchNormal1 } from 'iconsax-react';
import MainCard from 'components/MainCard';
import { FormattedMessage } from 'react-intl';

const mockServicesData = [
    {
        id: 1,
        name: 'Examen de Bienestar',
        icon: <Health size="32" variant="Bulk" />,
    },
    {
        id: 2,
        name: 'Vacunas',
        icon: <Briefcase size="32" variant="Bulk" />,
    },
    {
        id: 3,
        name: 'Desparasitación',
        icon: <Briefcase size="32" variant="Bulk" />,
    },
    {
        id: 4,
        name: 'Prevención de Pulgas y Garrapatas',
        icon: <Briefcase size="32" variant="Bulk" />,
    },
    {
        id: 5,
        name: 'Microchip ID',
        icon: <Briefcase size="32" variant="Bulk" />,
    },
    {
        id: 6,
        name: 'Esterilización/Castración',
        icon: <Scissor size="32" variant="Bulk" />,
    },
];

const ServicesList = () => {
    const theme = useTheme();
    const [search, setSearch] = useState('');

    const filteredServices = mockServicesData.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box >
            <Typography variant="h2">
                <FormattedMessage id="services" />
            </Typography>
            <TextField
                placeholder="Buscar servicios..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ my: 3, p: 0, width: "30%" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchNormal1 variant="Outline" />
                        </InputAdornment>
                    ),
                }}
            />
            <Grid container spacing={2}>
                {filteredServices.map(service => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                        <MainCard sx={{
                            cursor: 'pointer',
                            transition: 'border-color 200ms',
                            '&:hover': {
                                borderColor: theme.palette.primary.main
                            },
                            '& .MuiCardContent-root': {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: "center"
                            }
                        }}>
                            <span style={{ color: theme.palette.primary.main }}>{service.icon}</span>
                            <Typography variant="h6" align="center" sx={{ ml: 2, fontWeight: "500" }}>
                                {service.name}
                            </Typography>
                        </MainCard>
                    </Grid>
                ))}
                {filteredServices.length === 0 && (
                    <Grid item xs={12}>
                        <Card
                            elevation={0}
                            sx={{
                                border: '2px dashed #E0E0E0',
                                borderRadius: 2,
                                padding: 3,
                                textAlign: 'center'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    ¿No puedes encontrar lo que buscas?
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    Si necesitas algo más específico, descríbelo con tus propias palabras y haremos nuestro mejor esfuerzo para ayudarte.
                                </Typography>
                                <Button variant="contained" size="large" sx={{ textTransform: "none" }}>
                                    Describe tus necesidades
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default ServicesList;