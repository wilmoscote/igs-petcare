import { Box, Chip, Grid, Stack, Tab, TextField, Typography, Tabs, Divider } from '@mui/material'
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
    const { user } = useAuthStore()
    const userName = user?.name?.split(" ").length <= 1 ? user?.name : user?.name?.split(" ")[0]
    const [data, setData] = useState(mockAppoinmentData)
    const [value, setValue] = useState(startOfToday());
    const [valueTab, setValueTab] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [randomImage, setRandomImage] = useState(null);
    const today = formatDate(new Date());

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    useEffect(() => {
        const images = [successDog1, successDog2, successDog3, successDog4];
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    }, []);

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
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Stack>
                                <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
                                    <Tab label="Activas" icon={<Chip label="9" color="success" variant="contained" size="small" />} iconPosition="end" {...a11yProps(0)} />
                                    <Tab label="Cumplidas" icon={<Chip label="3" color="warning" variant="contained" size="small" sx={{ color: "white" }} />} iconPosition="end" {...a11yProps(1)} />
                                    <Tab
                                        label="Todas"
                                        icon={<Chip label="12" color="info" variant="contained" size="small" />}
                                        iconPosition="end"
                                        {...a11yProps(2)}
                                    />
                                </Tabs>
                                <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                    <TabPanel value={valueTab} index={0}>
                                        {data.map((appointment) =>
                                            <ClinicAppointmentCard appointment={appointment} key={appointment?.id} onSelect={setSelectedAppointment} selected={selectedAppointment} />
                                        )}
                                    </TabPanel>
                                    <TabPanel value={valueTab} index={1}>
                                        {data.map((appointment) =>
                                            <ClinicAppointmentCard appointment={appointment} key={appointment?.id} onSelect={setSelectedAppointment} selected={selectedAppointment} />
                                        )}
                                    </TabPanel>
                                    <TabPanel value={valueTab} index={2}>
                                        {data.map((appointment) =>
                                            <ClinicAppointmentCard appointment={appointment} key={appointment?.id} onSelect={setSelectedAppointment} selected={selectedAppointment} />
                                        )}
                                    </TabPanel>
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
                                    <AppointmentDetail booking={selectedAppointment} />
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