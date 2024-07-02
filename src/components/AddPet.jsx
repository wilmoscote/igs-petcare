import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project-imports

import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { ThemeMode } from 'config';

// assets
import { Camera, Pet, Trash } from 'iconsax-react';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

const avatarImage = require.context('assets/images/users', true);

// constant
const getInitialValues = (customer) => {
    const newCustomer = {
        name: '',
        email: '',
        location: '',
        orderStatus: ''
    };

    if (customer) {
        newCustomer.name = customer.fatherName;
        newCustomer.location = customer.address;
        return _.merge({}, newCustomer, customer);
    }

    return newCustomer;
};

const allStatus = ['Complicated', 'Single', 'Relationship'];

const AddPet = ({ pet, onCancel }) => {
    const theme = useTheme();
    const isCreating = !pet;

    const [selectedImage, setSelectedImage] = useState(undefined);
    const [avatar, setAvatar] = useState(pet?.avatar ? pet?.avatar : null);

    useEffect(() => {
        if (selectedImage) {
            setAvatar(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const PetSchema = Yup.object().shape({
        name: Yup.string().max(255).required('El nombre es obligatorio'),
        species: Yup.string().required('La especie es obligatoria'),
        breed: Yup.string().required('La raza es obligatoria'),
        sex: Yup.string().required('El sexo es obligatorio'),
        dateOfBirth: Yup.string().required('La fecha de nacimiento es obligatoria')
    });

    const [openAlert, setOpenAlert] = useState(false);

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
        onCancel();
    };

    const formik = useFormik({
        initialValues: {
            name: pet?.name || '',
            species: pet?.species || '',
            breed: pet?.breed || '',
            sex: pet?.sex || '',
            dateOfBirth: pet?.dateOfBirth || ''
        },
        validationSchema: PetSchema,
        onSubmit: (values, { setSubmitting }) => {
            try {
                // const newCustomer = {
                //   name: values.name,
                //   email: values.email,
                //   location: values.location,
                //   orderStatus: values.orderStatus
                // };

                if (pet) {
                    // dispatch(updateCustomer(customer.id, newCustomer)); - update
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Customer update successfully.',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                } else {
                    // dispatch(createCustomer(newCustomer)); - add
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Customer added successfully.',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                }

                setSubmitting(false);
                onCancel();
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{pet ? 'Editar Mascota' : 'Nueva Mascota'}</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={3}>
                                    <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                                        <FormLabel
                                            htmlFor="change-avtar"
                                            sx={{
                                                position: 'relative',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                '&:hover .MuiBox-root': { opacity: 1 },
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {avatar ? (
                                                <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                                            ) : (
                                                <Pet variant="Bold" size="72" />
                                            )}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Stack spacing={0.5} alignItems="center">
                                                    <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                                                    <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                                                </Stack>
                                            </Box>
                                        </FormLabel>
                                        <TextField
                                            type="file"
                                            id="change-avtar"
                                            placeholder="Outlined"
                                            variant="outlined"
                                            sx={{ display: 'none' }}
                                            onChange={(e) => setSelectedImage(e.target.files?.[0])}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-name">Nombre</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    id="pet-name"
                                                    placeholder="Ingrese el nombre de la mascota"
                                                    {...getFieldProps('name')}
                                                    error={Boolean(touched.name && errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-species">Especie</InputLabel>
                                                <FormControl fullWidth>
                                                    <Select
                                                        id="pet-species"
                                                        displayEmpty
                                                        {...getFieldProps('species')}
                                                        input={<OutlinedInput id="select-pet-species" />}
                                                        error={Boolean(touched.species && errors.species)}
                                                    >
                                                        <MenuItem value=""><Typography variant="subtitle1">Seleccione la especie</Typography></MenuItem>
                                                        <MenuItem value="Dog">Perro</MenuItem>
                                                        <MenuItem value="Cat">Gato</MenuItem>
                                                    </Select>
                                                    {touched.species && errors.species && (
                                                        <FormHelperText error>{errors.species}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-breed">Raza</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    id="pet-breed"
                                                    placeholder="Ingrese la raza de la mascota"
                                                    {...getFieldProps('breed')}
                                                    error={Boolean(touched.breed && errors.breed)}
                                                    helperText={touched.breed && errors.breed}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-sex">Sexo</InputLabel>
                                                <FormControl fullWidth>
                                                    <Select
                                                        id="pet-sex"
                                                        displayEmpty
                                                        {...getFieldProps('sex')}
                                                        input={<OutlinedInput id="select-pet-sex" />}
                                                        error={Boolean(touched.sex && errors.sex)}
                                                    >
                                                        <MenuItem value=""><Typography variant="subtitle1">Seleccione el sexo</Typography></MenuItem>
                                                        <MenuItem value="Male">Macho</MenuItem>
                                                        <MenuItem value="Female">Hembra</MenuItem>
                                                    </Select>
                                                    {touched.sex && errors.sex && (
                                                        <FormHelperText error>{errors.sex}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-dateOfBirth">Fecha de Nacimiento</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    id="pet-dateOfBirth"
                                                    placeholder="MM/DD/YYYY"
                                                    {...getFieldProps('dateOfBirth')}
                                                    error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                                                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ p: 2.5 }}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    {!isCreating && (
                                        <Tooltip title="Eliminar mascota" placement="top">
                                            <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                                                <Trash variant="Bold" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Button color="error" onClick={onCancel}>
                                            Cancelar
                                        </Button>
                                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                                            {pet ? 'Editar' : 'Agregar'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertCustomerDelete title={pet.name} open={openAlert} handleClose={handleAlertClose} />}
        </>
    );
};

export default AddPet;