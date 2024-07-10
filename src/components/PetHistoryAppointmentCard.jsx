import { Avatar, Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material'
import { Theme } from 'emoji-picker-react'
import { ArrowRight, Briefcase, Man, Woman } from 'iconsax-react'
import React from 'react'
import { formatAge, formatToTime } from 'utils/petUtils'
import { format } from 'date-fns';
import MainCard from './MainCard'
import { ThemeMode } from 'config'

const PetHistoryAppointmentCard = ({ appointment, onSelect, selected }) => {
    const theme = useTheme();

    return (
        <MainCard sx={{
            mx: 2, mb: 1, transition: "background-color 0.2s ease-in-out", '&:hover': {
                cursor: "pointer",
                backgroundColor: theme.palette.mode === ThemeMode.LIGHT ? "rgb(241 245 249)" : "rgb(30 41 59)"
            },
            borderColor: appointment?.uuid === selected?.uuid ? theme.palette.primary.main : theme.palette.divider
        }}
        // onClick={() => onSelect(appointment)}
        >
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent={"space-between"} spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {appointment?.clinic?.logo ? (
                            <Avatar src={appointment?.pets?.img_profile} alt={appointment?.pets?.name} />
                        ) : (
                            <Briefcase color={theme.palette.primary.main} variant='Bold' size={"25"} />
                        )}
                        <Box>
                            <Typography variant="body1" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} mb={0.5}>Servicio: <strong>{appointment?.service?.name || ""}</strong></Typography>
                            <Typography variant="body1" mb={0.5}>Clínica: <strong>{appointment?.clinic?.name || ""}</strong></Typography>
                            <Typography variant="body1" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>Fecha: <strong>{appointment?.date || ""}</strong></Typography>
                        </Box>
                    </Stack>
                    <Stack alignItems={"center"}>
                        {appointment?.status === "active" ? (
                            <Chip label="Activa" color="success" />
                        ) : (
                            <Chip label="Cumplida" color="primary" />
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </MainCard>
    )
};

export default PetHistoryAppointmentCard