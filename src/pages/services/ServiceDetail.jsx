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
    LinearProgress,
    FormHelperText,
    Dialog
} from '@mui/material';
import { Health, Briefcase, Scissor, Man, Woman, Buildings } from 'iconsax-react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { mockClinicsData, mockPetsData, mockServicesData } from 'utils/mockData';
import bgPattern from 'assets/images/bgPattern.jpg'
import { format } from 'date-fns';

// material-ui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
// project-imports
import MainCard from 'components/MainCard';
import usePetStore from 'store/usePetStore';
import { useAuthStore } from 'store/useAuthStore';
import useAuth from 'hooks/useAuth';
import { formatAge } from 'utils/petUtils';
import { DatePicker } from '@mui/x-date-pickers';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { LoadingButton } from '@mui/lab';
import ConfirmSchedule from './ConfirmSchedule';
import { ThemeMode } from 'config';
import { PopupTransition } from 'components/@extended/Transitions';
import AddPet from 'components/AddPet';
import NoPetsMessage from 'components/NoPetsMessage';

const weekDaysMap = {
    'SUNDAY': 0,
    'MONDAY': 1,
    'TUESDAY': 2,
    'WEDNESDAY': 3,
    'THURSDAY': 4,
    'FRIDAY': 5,
    'SATURDAY': 6
};

const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const date = new Date(0, 0, 0, hour, minute);
    return format(date, 'h a');
};

const ServiceDetail = () => {
    const navigate = useNavigate();
    const { selectedService } = usePetStore();
    const theme = useTheme();
    const { serviceId } = useParams();
    const { user } = useAuthStore();
    const [pets, setPets] = useState(null);
    const [clinics, setClinics] = useState(null);
    const { getPets, getClinics, createSchedule } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [petError, setPetError] = useState(null);
    const [clinicError, setClinicError] = useState(null);
    const [dateError, setDateError] = useState(null);
    const [timeError, setTimeError] = useState(null);
    const [contactError, setContactError] = useState(null);
    const { selectedPet: selectedPetStore } = usePetStore();
    const [service, setService] = useState(null);
    const [selectedPet, setSelectedPet] = useState('');
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [notes, setNotes] = useState('');
    const [phone, setPhone] = useState(user?.phone || "");
    const [add, setAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservation, setReservation] = useState({
        petName: "",
        serviceName: '',
        clinicName: '',
        date: '',
        time: '',
        phone: phone
    });

    const handleAdd = () => {
        setAdd(!add);
    };

    const handlePetChange = (event) => {
        setPetError(null);
        setSelectedPet(event.target.value);
        const pet = pets.find(p => p.id === event.target.value);
        setReservation(prev => ({ ...prev, petName: pet?.name || "" }));
    };

    const handleClinicChange = (event) => {
        setSelectedTime(null);
        setClinicError(null);
        setSelectedClinic(event.target.value);
        const clinic = clinics.find(c => c.id === event.target.value);
        // console.log(clinic)
        setReservation(prev => ({ ...prev, clinicName: clinic?.name || "" }));
    };

    useEffect(() => {
        setService(selectedService);
        setReservation(prev => ({ ...prev, serviceName: selectedService?.name || "" }));
    }, [serviceId, selectedService]);

    const getMyPets = async () => {
        try {
            setLoading(true)
            const response = await getPets();
            if (response.data?.success) {
                setPets(response.data?.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    const fetchClinics = async () => {
        try {
            const response = await getClinics();
            if (response.data?.success) {
                setClinics(response.data?.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMyPets();
        fetchClinics();
    }, []);

    useEffect(() => {
        if (pets?.length > 0 && selectedPetStore) {
            const petFound = pets.find(pet => pet.id === selectedPetStore.id);
            setSelectedPet(petFound?.id);
            setReservation(prev => ({ ...prev, petName: petFound?.name || "" }));
        }
    }, [selectedPetStore, pets]);

    useEffect(() => {
        if (selectedDate && selectedTime) {
            setReservation(prev => ({
                ...prev,
                date: `${format(selectedDate, 'yyyy-MM-dd')}`
            }));

            setReservation(prev => ({
                ...prev,
                time: `${formatTime(format(selectedTime, 'HH:mm:ss')) ?? format(selectedTime, 'HH:mm:ss')}`
            }));
        }
    }, [selectedDate, selectedTime]);

    const validateFields = () => {
        let isValid = true;
        if (!selectedPet) {
            setPetError("Seleccione una mascota");
            isValid = false;
        }
        if (!selectedClinic) {
            setClinicError("Seleccione una clínica");
            isValid = false;
        }
        if (!selectedDate) {
            setDateError("Seleccione una fecha");
            isValid = false;
        }
        if (!selectedTime) {
            setTimeError("Seleccione una hora");
            isValid = false;
        } else {
            const clinic = clinics?.find(c => c.id === selectedClinic);
            if (clinic) {
                const enabledDays = clinic.schedule_week.map(day => weekDaysMap[day]);
                const selectedDay = selectedDate.getDay();
                if (!enabledDays.includes(selectedDay)) {
                    setDateError("Seleccione una fecha en un día hábil de la clínica");
                    isValid = false;
                }
                const timeStart = parseInt(clinic.time_start.split(':')[0], 10);
                const timeEnd = parseInt(clinic.time_end.split(':')[0], 10);
                const selectedHour = selectedTime.getHours();
                if (selectedHour < timeStart || selectedHour >= timeEnd) {
                    setTimeError(`Seleccione una hora entre ${formatTime(clinic.time_start)} y ${formatTime(clinic.time_end)}`);
                    isValid = false;
                }
            }
        }
        if (!phone || phone === "") {
            setContactError("Ingrese un número de teléfono");
            isValid = false;
        }
        return isValid;
    };

    const sendSchedule = async () => {
        if (validateFields()) {
            try {
                setSubmitting(true);
                const formData = new FormData();
                formData.append('user_id', user?.id);
                formData.append('pet_id', selectedPet);
                formData.append('clinic_id', selectedClinic);
                formData.append('service_id', service?.id);
                formData.append('date', `${format(selectedDate, 'yyyy-MM-dd')} ${format(selectedTime, 'HH:mm:ss')}`);
                formData.append('additional_contact', phone);
                formData.append('additional_info', notes);

                // for (let [key, value] of formData.entries()) {
                //     console.log(`${key}: ${value}`);
                // }

                const response = await createSchedule(formData);
                if (response.data.success) {
                    setIsModalOpen(false)
                    navigate(`/services/success-schedule/${response.data?.data?.booking_code || response.data?.data?.id}`);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    const handleOpenModal = () => {
        if (validateFields()) {
            setIsModalOpen(true);
        }
    };

    const handleScheduleConfirmed = () => {
        setIsModalOpen(false);
        sendSchedule();
    };

    const isDayDisabled = (date) => {
        const day = date.getDay();
        const clinic = clinics.find(c => c.id === selectedClinic);

        const enabledDays = clinic?.schedule_week?.map(day => weekDaysMap[day]);
        return !enabledDays.includes(day);
    };

    if (!selectedService) {
        return <Navigate to="/services" />
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3
            }}
        >
            {loading ? (
                <Box sx={{ display: "flex", flexDirection: "column", py: 10, width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>

                    {!pets?.length <= 0 ? (
                        <Container sx={{
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: theme.palette.mode === ThemeMode.LIGHT ? "white" : "rgb(30 41 59)", px: { xs: 3, md: 15 }, py: { xs: 4, md: 8 }, borderRadius: 3,
                        }}>
                            <Box minWidth={"100%"}>
                                <Typography variant='h3' gutterBottom>Detalles del servicio: </Typography>
                                <Stack direction="row" alignItems="center" spacing={2} mt={3}>
                                    {!service?.img ? (
                                        <span style={{ color: theme.palette.primary.main }}><Briefcase size="32" variant="Bulk" /></span>
                                    ) : (
                                        <Avatar src={service.img} />
                                    )}
                                    <Typography variant="h4">{service?.name}</Typography>
                                </Stack>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                                    {service?.description}
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
                                                    error={petError}
                                                >
                                                    <MenuItem disabled value="" sx={{ color: 'text.secondary' }}>
                                                        Seleccionar Mascota
                                                    </MenuItem>
                                                    {pets.map((pet) => (
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
                                                {petError && (
                                                    <FormHelperText error>{petError}</FormHelperText>
                                                )}
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
                                                error={clinicError}
                                            >
                                                <MenuItem disabled value="" sx={{ color: 'text.secondary' }}>
                                                    Seleccionar Clínica
                                                </MenuItem>
                                                {clinics?.map((clinic) => (
                                                    <MenuItem key={clinic.id} value={clinic.id}>
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            {clinic.logo ? (
                                                                <Avatar src={clinic.logo || ""} alt={clinic.name} />
                                                            ) : (
                                                                <Buildings color={theme.palette.primary.main} size="32" />
                                                            )}
                                                            <Box>
                                                                <Typography variant="subtitle1" >{clinic.name}  </Typography>
                                                                <Typography variant="body2" color="secondary">{clinic.address || ""}</Typography>
                                                                <Typography variant="body2" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>Horario: {formatTime(clinic.time_start)} a {formatTime(clinic.time_end)}</Typography>
                                                            </Box>
                                                        </Stack>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {clinicError && (
                                                <FormHelperText error>{clinicError}</FormHelperText>
                                            )}
                                        </FormControl>
                                        <Typography variant='h5' sx={{ mt: 2 }}><span style={{ color: theme.palette.primary.main }}> * </span>Fecha </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                                            <DatePicker
                                                sx={{ width: "100%" }}
                                                value={selectedDate}
                                                onChange={(newValue) => {
                                                    setDateError(null);
                                                    setSelectedDate(newValue);
                                                }}
                                                disabled={!selectedClinic}
                                                renderInput={(params) => <TextField fullWidth {...params} />}
                                                minDate={startOfToday()}
                                                maxDate={new Date(user?.client_assistance_plan?.end_date_period)}
                                                shouldDisableDate={isDayDisabled}
                                            />
                                            {dateError && (
                                                <FormHelperText error>{dateError}</FormHelperText>
                                            )}
                                        </LocalizationProvider>
                                        <Typography variant='h5' sx={{ mt: 2 }}><span style={{ color: theme.palette.primary.main }}> * </span>Hora </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                                            <TimePicker
                                                // label="Seleccionar Hora"
                                                sx={{ width: "100%" }}
                                                value={selectedTime}
                                                onChange={(newValue) => {
                                                    setTimeError(null);
                                                    setSelectedTime(newValue);
                                                }}
                                                disabled={!selectedClinic}
                                                renderInput={(params) => <TextField fullWidth {...params} />}
                                                shouldDisableTime={(timeValue, clockType) => {
                                                    const clinic = clinics?.find(c => c.id === selectedClinic);
                                                    if (!clinic) return false;
                                                    const timeStart = parseInt(clinic.time_start.split(':')[0]);
                                                    const timeEnd = parseInt(clinic.time_end.split(':')[0]);
                                                    const hour = timeValue.getHours();
                                                    if (clockType === 'hours') {
                                                        return hour < timeStart || hour >= timeEnd;
                                                    }
                                                    return false;
                                                }}
                                            />
                                            {timeError && (
                                                <FormHelperText error>{timeError}</FormHelperText>
                                            )}
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant='h5' sx={{ mt: 2 }}><span style={{ color: theme.palette.primary.main }}> * </span>Información de contacto </Typography>
                                        <TextField
                                            placeholder="Número de Teléfono"
                                            value={phone}
                                            required
                                            onChange={(e) => {
                                                setContactError(null);
                                                setPhone(e.target.value);
                                                setReservation(prev => ({ ...prev, phone: e.target.value }));
                                            }}
                                            fullWidth
                                            sx={{ mt: 1, borderRadius: 2 }}
                                        />
                                        {contactError && (
                                            <FormHelperText error>{contactError}</FormHelperText>
                                        )}
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
                                        <LoadingButton loading={submitting} variant="contained" fullWidth color="primary" sx={{ fontWeight: "500" }} onClick={handleOpenModal} >
                                            Agendar
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "column", py: 3, width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <NoPetsMessage handleAdd={handleAdd} />
                        </Box>
                    )
                    }
                </>
            )}
            <ConfirmSchedule
                reservation={reservation}
                open={isModalOpen}
                handleClose={setIsModalOpen}
                onConfirm={handleScheduleConfirmed}
                loading={submitting}
            />
            <Dialog
                maxWidth="sm"
                fullWidth
                TransitionComponent={PopupTransition}
                onClose={handleAdd}
                open={add}
                sx={{ '& .MuiDialog-paper': { p: 0 } }}
            >
                <AddPet onCancel={handleAdd} getMyPets={getMyPets} />
            </Dialog>
        </Box >
    );
};

export default ServiceDetail;