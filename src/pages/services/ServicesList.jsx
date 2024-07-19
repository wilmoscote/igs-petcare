import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Box, Button, useTheme, OutlinedInput, InputAdornment, CircularProgress, Stack } from '@mui/material';
import { Health, Briefcase, Worm, ShieldTick, Microchip, Scissors, Scissor, SearchNormal1 } from 'iconsax-react';
import MainCard from 'components/MainCard';
import { FormattedMessage } from 'react-intl';
import { mockServicesData } from 'utils/mockData';
import { useNavigate } from 'react-router';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import usePetStore from 'store/usePetStore';
import Avatar from 'components/@extended/Avatar';
import NoAssistanceMessage from 'components/NoAssistanceMessage';

const ServicesList = () => {
    const theme = useTheme();
    const { setSelectedService } = usePetStore();
    const { getServices, validateUserBooking } = useAuth();
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [assistanceInfo, setAssistanceInfo] = useState(null);
    const [search, setSearch] = useState('');

    const filteredServices = services?.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    const fetchServices = async () => {
        try {
            setLoading(true)
            const response = await getServices();
            // console.log(response.data)
            if (response.data?.success) {
                setServices(response.data?.data)
            } else {
                console.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserValidation = async () => {
        try {
            setLoading(true)
            const response = await validateUserBooking();
            console.log(response.data)
            setAssistanceInfo(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchServices()
        fetchUserValidation()
    }, [])

    return (
        <Box >
            <Typography variant="h2">
                <FormattedMessage id="services" />
            </Typography>
            {assistanceInfo?.success && (
                <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
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
                    {assistanceInfo?.data?.assistance_available && (
                        <Typography variant="h5" color="primary" fontWeight={"600"} paragraph>
                            Tienes {assistanceInfo?.data?.assistance_available} asistencias restantes.
                        </Typography>
                    )}
                </Stack>
            )}
            <Grid container spacing={2}>
                {loading ? (
                    <Box sx={{ display: "flex", flexDirection: "column", py: 10, width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {assistanceInfo?.success ? (
                            <>
                                {filteredServices?.map(service => (
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
                                        }}
                                            onClick={(e) => {
                                                setSelectedService(service)
                                                navigate(`/services/detail/${service.id}`)
                                            }}
                                        >
                                            {!service?.img ? (
                                                <span style={{ color: theme.palette.primary.main }}><Briefcase size="32" variant="Bulk" /></span>
                                            ) : (
                                                <Avatar src={service.img} />
                                            )}
                                            <Typography variant="h6" align="left" sx={{ ml: 2, fontWeight: "500" }}>
                                                {service.name}
                                            </Typography>
                                        </MainCard>
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", py: 3, width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <NoAssistanceMessage />
                            </Box>
                        )}
                    </>
                )}

                {filteredServices?.length === 0 && (
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