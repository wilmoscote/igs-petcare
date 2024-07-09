import { Box, Chip, Grid, Stack, Tab, TextField, Typography, Tabs, Divider, CircularProgress } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ClinicAppointmentCard from 'components/ClinicAppointmentCard';
import MainCard from 'components/MainCard';
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { mockAppoinmentData } from 'utils/mock-data';
import isWeekend from 'date-fns/isWeekend';
import { startOfToday } from 'date-fns';
import successDog1 from 'assets/images/success/success-dog-1.webp'
import successDog2 from 'assets/images/success/success-dog-2.webp'
import successDog3 from 'assets/images/success/success-dog-3.webp'
import successDog4 from 'assets/images/success/success-dog-4.webp'
import { useEffect } from 'react';
import { useAuthStore } from 'store/useAuthStore';
import AppointmentDetail from 'components/AppointmentDetail';
import useClinicStore from 'store/useClinicStore';
import useAuth from 'hooks/useAuth';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}

const formatDate = (date) => {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

const ClinicDashboard = () => {
    const { user } = useClinicStore();
    const { getClinicBookingList } = useAuth();
    const [bookings, setBookings] = useState([])
    const [time, setTime] = useState("day")
    const [doneBookings, setDoneBookings] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingDone, setLoadingDone] = useState(false);
    const userName = user?.name
    const [data, setData] = useState(mockAppoinmentData)
    const [valueTab, setValueTab] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [randomImage, setRandomImage] = useState(null);
    const today = formatDate(new Date());

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value)
    };

    useEffect(() => {
        const images = [successDog1, successDog2, successDog3, successDog4];
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    }, []);

    const getBookingList = async () => {
        setLoading(true);
        try {
            const response = await getClinicBookingList("active", time);
            console.log(response.data)
            if (response.data.success) {
                setBookings(response.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getDoneBookingList = async () => {
        setLoadingDone(true);
        try {
            const response = await getClinicBookingList("inactive", time);
            console.log(response.data)
            if (response.data.success) {
                setDoneBookings(response.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingDone(false);
        }
    }

    const onChangeStatus = () => {
        getBookingList()
        getDoneBookingList()
        setSelectedAppointment(null)
    }

    useEffect(() => {
        getBookingList()
        getDoneBookingList()
        setSelectedAppointment(null)
    }, [time])


    return (
        <Box sx={{ width: '100%', }}>
            <Typography variant="h2" sx={{ ml: 2, mt: 3, mb: 3 }}>
                Bienvenido, {userName || "Usuario"}
            </Typography>
            <MainCard>
                <Box sx={{ width: '100%', }}>
                    <Grid container spacing={2} justifyContent="left">
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <Stack direction={"row"} justifyContent="space-between" sx={{ mt: 2, mb: 1 }} alignItems="center">
                                    <Typography variant="h4" textAlign={"left"}>
                                        Citas
                                    </Typography>
                                    <TextField
                                        id="date"
                                        placeholder="Birthday"
                                        type="date"
                                        defaultValue={today}
                                        onChange={handleTimeChange}
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Stack>
                                <Box sx={{ display: "flex", width: "100%", justifyContent: "left", ml: 2 }}>
                                    <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
                                        <Tab label="Activas" icon={<Chip label={bookings?.length} color="success" variant="contained" size="small" />} iconPosition="end" {...a11yProps(0)} />
                                        <Tab label="Cumplidas" icon={<Chip label={doneBookings?.length} color="warning" variant="contained" size="small" sx={{ color: "white" }} />} iconPosition="end" {...a11yProps(1)} />
                                        {/* <Tab
                                        label="Todas"
                                        icon={<Chip label="12" color="info" variant="contained" size="small" />}
                                        iconPosition="end"
                                        {...a11yProps(2)}
                                    /> */}
                                    </Tabs>
                                </Box>
                                <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                    <TabPanel value={valueTab} index={0}>
                                        {loading ? (
                                            <Box sx={{ display: "flex", my: 5, justifyContent: "center", alignItems: "center" }}>
                                                <CircularProgress />
                                            </Box>
                                        ) : (
                                            <>
                                                {bookings && bookings?.length > 0 ? (
                                                    bookings?.map((appointment) =>
                                                        <ClinicAppointmentCard appointment={appointment} key={appointment?.id} onSelect={setSelectedAppointment} selected={selectedAppointment} />
                                                    )
                                                ) : (
                                                    <Box sx={{ display: "flex", my: 5, justifyContent: "center", alignItems: "center" }}>
                                                        <Typography variant="body1">No hay citas para mostrar</Typography>
                                                    </Box>
                                                )}
                                            </>
                                        )}

                                    </TabPanel>
                                    <TabPanel value={valueTab} index={1}>
                                        {loadingDone ? (
                                            <Box sx={{ display: "flex", my: 5, justifyContent: "center", alignItems: "center" }}>
                                                <CircularProgress />
                                            </Box>
                                        ) : (
                                            <>
                                                {doneBookings && doneBookings?.length > 0 ? (
                                                    doneBookings?.map((appointment) =>
                                                        <ClinicAppointmentCard appointment={appointment} key={appointment?.id} onSelect={setSelectedAppointment} selected={selectedAppointment} />
                                                    )
                                                ) : (
                                                    <Box sx={{ display: "flex", my: 5, justifyContent: "center", alignItems: "center" }}>
                                                        <Typography variant="body1">No hay citas para mostrar</Typography>
                                                    </Box>
                                                )}
                                            </>
                                        )}
                                    </TabPanel>
                                    {/* <TabPanel value={valueTab} index={2}>
                                        {data.map((appointment) =>
                                            <ClinicAppointmentCard appointment={appointment} key={appointment?.id} onSelect={setSelectedAppointment} selected={selectedAppointment} />
                                        )}
                                    </TabPanel> */}
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Box sx={{ borderLeft: 1, borderColor: 'divider', height: "100%", width: "5%" }}>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {!selectedAppointment ? (
                                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                                    <img
                                        src={randomImage}
                                        alt="Happy Puppy"
                                        style={{ maxWidth: '80%', maxHeight: "400px", borderRadius: '8px' }}
                                    />
                                    <Typography variant="h4" textAlign={"left"} sx={{ mt: 3 }}>
                                        Seleccione una cita para ver más información.
                                    </Typography>
                                </Box>
                            ) : (
                                <Box>
                                    <AppointmentDetail booking={selectedAppointment} onChange={onChangeStatus} selected={setSelectedAppointment} />
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        </Box>
    )
}

export default ClinicDashboard