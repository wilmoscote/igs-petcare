import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Stack, Avatar, Box, DialogActions, Grid, Button, Chip, useTheme, Divider } from '@mui/material';
import { formatToDate } from 'utils/petUtils';
import { ThemeMode } from 'config';

const UserDetailModal = ({ open, handleClose, user }) => {
    const theme = useTheme();

    if (!user) return null;

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" justifyContent={"space-between"} spacing={2} alignItems="center">
                    <Typography fontWeight={"bold"} variant="h5">Perfil de Dueño</Typography>
                    <Chip label={user.status === 'ACTIVE' ? 'Activo' : 'Inactivo'} color={user.status === 'ACTIVE' ? 'success' : 'default'} />
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar>{user.name.charAt(0)}</Avatar>
                        <Box>
                            <Typography variant="h6" fontWeight={"bold"}>{user.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Stack>
                    <Typography variant="body1">
                        <strong>DNI:</strong> {user.dni}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Teléfono:</strong> {user.phone}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Dirección:</strong> {user.address}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Registrado el:</strong> {new Date(user.created_at).toLocaleDateString()}
                    </Typography>
                    <Divider />
                    <Typography variant="h6" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                        <strong> Información del Plan</strong>
                    </Typography>
                    <Stack spacing={1}>
                        <Typography variant="body1" py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                            <strong>{user?.client_assistance_plan?.assistance_plan?.name || "Cliente"}</strong>
                        </Typography>
                        <Typography variant="body1" py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                            Total asistencias: <strong> {user?.client_assistance_plan?.assistance_plan?.assistance_total || ""}</strong>
                        </Typography>
                        <Typography variant="body1" py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                            Asistencias solicitadas: <strong>{user?.client_assistance_plan?.count_assistance_used || ""}</strong>
                        </Typography>
                        <Typography variant="body1" py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                            Periodo plan: <strong> {formatToDate(user?.client_assistance_plan?.start_date_period) || ""} -  {formatToDate(user?.client_assistance_plan?.end_date_period) || ""}</strong>
                        </Typography>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Grid container justifyContent="end" alignItems="center">
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button onClick={handleClose} variant="contained" >
                                Volver
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailModal;