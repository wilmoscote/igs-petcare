import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Stack, Avatar, Box, DialogActions, Grid, Button, Chip } from '@mui/material';

const UserDetailModal = ({ open, handleClose, user }) => {
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