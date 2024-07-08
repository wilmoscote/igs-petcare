import { Avatar, Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import { Theme } from 'emoji-picker-react'
import { Man, Woman } from 'iconsax-react'
import React from 'react'
import { formatAge, formatToTime } from 'utils/petUtils'
import { format } from 'date-fns';
import MainCard from './MainCard'

const ClinicAppointmentCard = ({ appointment, onSelect, selected }) => {
    const theme = useTheme();

    return (
        <MainCard sx={{
            mx: 2, mb: 1, transition: "background-color 0.2s ease-in-out", '&:hover': {
                cursor: "pointer",
                backgroundColor: "rgb(241 245 249)"
            },
            borderColor: appointment?.uuid === selected?.uuid ? theme.palette.primary.main : theme.palette.divider
        }}
            onClick={() => onSelect(appointment)}
        >
            <Stack direction="row" alignItems="center" justifyContent={"space-between"} spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={appointment?.pets.img_profile} alt={appointment?.pets.name} />
                    <Box>
                        <Typography variant="subtitle1" color={appointment?.pets.gender === "male" ? "#2CCCE4" : "#F47373"} >{appointment?.pets.name} {appointment?.pets.gender === "male" ? <Man size="13" color={"#2CCCE4"} /> : <Woman size="13" color={"#F47373"} />} </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                        {formatAge(appointment?.pets.birthday_date) || ""}
                    </Typography> */}
                        <Typography variant="subtitle2" color="black">{appointment?.service.name || ""}</Typography>
                    </Box>
                </Stack>
                <Stack alignItems={"center"}>
                    <Chip label={formatToTime(appointment?.date)} color="success" sx={{ p: 0 }} />
                    {/* {appointment?.status === "active" ? (
                        <Chip variant='light' label="Activa" color="success" sx={{ p: 0 }} />
                    ) : (
                        <Chip label="Inactiva" />
                    )} */}
                </Stack>
            </Stack>
        </MainCard>
    )
}

export default ClinicAppointmentCard