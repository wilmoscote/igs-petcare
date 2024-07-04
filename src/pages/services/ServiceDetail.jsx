import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Grid,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Stack,
    Avatar,
    Select,
    Container,
    useTheme,
    CircularProgress,
    LinearProgress
} from '@mui/material';
import { Health, Briefcase, Scissor, Man, Woman } from 'iconsax-react';
import { useNavigate, useParams } from 'react-router';
import { mockClinicsData, mockPetsData, mockServicesData } from 'utils/mockData';
import bgPattern from 'assets/images/bgPattern.jpg'

// material-ui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// project-imports
import MainCard from 'components/MainCard';
import usePetStore from 'store/usePetStore';
import { useAuthStore } from 'store/useAuthStore';
import useAuth from 'hooks/useAuth';
import { formatAge } from 'utils/petUtils';

const ServiceDetail = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { serviceId } = useParams();
    const { user } = useAuthStore();
    const [pets, setPets] = useState(null);
    const [clinics, setClinics] = useState(null)
    const { getPets, getClinics } = useAuth();
    const { selectedPet: selectedPetStore } = usePetStore();
    const [service, setService] = useState(null);
    const [selectedPet, setSelectedPet] = useState('');
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [notes, setNotes] = useState('');
    const [phone, setPhone] = useState(user?.phone || "");

    const handlePetChange = (event) => {
        setSelectedPet(event.target.value);
    };

    const handleClinicChange = (event) => {
        setSelectedClinic(event.target.value);
    };

    useEffect(() => {
        const serviceFound = mockServicesData.find(s => s.id === parseInt(serviceId, 10));
        setService(serviceFound);

    }, [serviceId, selectedPetStore]);

    const getMyPets = async () => {
        try {
            //   setLoading(true)
            const response = await getPets();
            // console.log(response.data)
            if (response.data?.success) {
                setPets(response.data?.data)
            } else {
                console.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            //   setLoading(false)
        }
    }

    const fetchClinics = async () => {
        try {
            //   setLoading(true)
            const response = await getClinics();
            console.log(response.data)
            if (response.data?.success) {
                setClinics(response.data?.data)
            } else {
                console.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            //   setLoading(false)
        }
    }

    useEffect(() => {
        getMyPets()
        fetchClinics()
    }, [])

    useEffect(() => {
        if (pets?.length > 0 && selectedPetStore) {
            console.log("Finding pet!");
            // console.log(selectedPetStore);
            const petFound = pets?.find(pet => pet.id === selectedPetStore.id);
            setSelectedPet(petFound?.id);
            // console.log(petFound);
        }
    }, [selectedPetStore, pets]);

    const handleSchedule = () => {
        navigate("/services/success-schedule")
    }

    if (!service) {
        return <Typography variant="h6">Servicio no encontrado</Typography>;
    }

    return (
        <Box
            sx={{
                // backgroundImage: `url(${bgPattern})`,
                // backgroundRepeat: 'repeat',
                // backgroundSize: '300px 200px',
                // backgroundOpacity: 0.3,
                // minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3
            }}
        >
            <Container sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white", px: { xs: 3, md: 15 }, py: { xs: 4, md: 8 }, borderRadius: 3,
                // border: `1px solid ${theme.palette.secondary.light}` 
            }}>
                <Box minWidth={"100%"}>
                    <Typography variant='h3' gutterBottom>Detalles del servicio: </Typography>
                    <Stack direction="row" alignItems="center" spacing={2} mt={3}>
                        {service.icon}
                        <Typography variant="h4">{service.name}</Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        {service.description}
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 0 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h5' sx={{ mt: 2 }}><span style={{ color: theme.palette.primary.main }}> * </span>Información de la Mascota: </Typography>
                            {pets?.length > 0 ? (
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <Select
                                        value={selectedPet}
                                        displayEmpty
                                        onChange={handlePetChange}
                                        placeholder="Seleccionar Mascota"
                                        disabled={pets.length === 0}
                                    >
                                        <MenuItem disabled value="" sx={{ color: 'text.secondary' }}>
                                            Seleccionar Mascota
                                        </MenuItem>
                                        {pets?.map((pet) => (
                                            <MenuItem key={pet.id} value={pet.id}>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar src={pet.img_profile} alt={pet.name} />
                                                    <Box>
                                                        <Typography variant="subtitle1" color={pet.gender === "male" ? "#2CCCE4" : "#F47373"} >{pet.name} {pet.gender === "male" ? <Man size="13" color={"#2CCCE4"} /> : <Woman size="13" color={"#F47373"} />} </Typography>
                                                        <Typography variant="body2" color="secondary">{pet.specie?.name || ""}, {pet.breed?.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatAge(pet.birthday_date) || ""}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <Box sx={{ py: 3 }}>
                                    <LinearProgress sx={{ width: "100%" }} />
                                </Box>
                            )}
                            <Typography variant='h5' sx={{ mt: 2 }}><span style={{ color: theme.palette.primary.main }}> * </span>Clínica </Typography>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <Select
                                    labelId="select-clinic-label"
                                    value={selectedClinic}
                                    onChange={handleClinicChange}
                                    displayEmpty
                                >
                                    <MenuItem disabled value="" sx={{ color: 'text.secondary' }}>
                                        Seleccionar Clínica
                                    </MenuItem>
                                    {clinics?.map((clinic) => (
                                        // <MenuItem key={clinic.id} value={clinic.id}>
                                        //     {clinic.name}
                                        // </MenuItem>

                                        <MenuItem key={clinic.id} value={clinic.id}>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Avatar src={clinic.logo || ""} alt={clinic.name} />
                                                <Box>
                                                    <Typography variant="subtitle1" >{clinic.name}  </Typography>
                                                    <Typography variant="body2" color="secondary">{clinic.address || ""}</Typography>
                                                    {/* <Typography variant="body2" color="text.secondary">
            {formatAge(pet.birthday_date) || ""}
        </Typography> */}
                                                </Box>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant='h5' sx={{ mt: 2 }}><span style={{ color: theme.palette.primary.main }}> * </span>Fecha y hora: </Typography>
                            <TextField
                                id="datetime-local"
                                placeholder="Next Appointment"
                                type="datetime-local"
                                fullWidth
                                defaultValue="2017-05-24T10:30"
                                sx={{ mt: 1 }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h5' sx={{ mt: 2 }}><span style={{ color: theme.palette.primary.main }}> * </span>Información de contacto </Typography>
                            <TextField
                                placeholder="Número de Teléfono"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                fullWidth
                                sx={{ mt: 1, borderRadius: 2 }}
                            />
                            <Typography variant='h5' sx={{ mt: 2 }}>Información adicional (opcional) </Typography>
                            <TextField
                                placeholder="Notas adicionales para el servicio..."
                                multiline
                                rows={6.5}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                fullWidth
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" fullWidth color="primary" sx={{ fontWeight: "500" }} onClick={handleSchedule} >
                                Agendar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default ServiceDetail;