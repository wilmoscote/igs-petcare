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
import useAuth from 'hooks/useAuth';
import { useAuthStore } from 'store/useAuthStore';

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

const PetProfile = ({ pet, onCancel }) => {
    const { user } = useAuthStore();
    const { getSpecies, createPet, editPet } = useAuth();
    const theme = useTheme();
    const isCreating = !pet;
    const [species, setSpecies] = useState(null);
    const [breeds, setBreeds] = useState([]);
    const [selectedImage, setSelectedImage] = useState(undefined);
    const [avatar, setAvatar] = useState(pet?.img_profile ? pet?.img_profile : null);

    // const fetchSpecies = async () => {
    //     try {
    //         const response = await getSpecies();
    //         if (response.data?.success) {
    //             setSpecies(response.data?.data);
    //             if (pet) {
    //                 const selectedSpecies = response.data?.data.find(specie => specie.id === pet.specie_id);
    //                 setBreeds(selectedSpecies?.breeds || []);
    //             }
    //         } else {
    //             console.error(response.data.message);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchSpecies();
    // }, []);

    useEffect(() => {
        if (selectedImage) {
            setAvatar(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const PetSchema = Yup.object().shape({
        name: Yup.string().max(255).required('El nombre es obligatorio'),
        species: Yup.string().required('La especie es obligatoria'),
        breed: Yup.string().when('species', {
            is: (value) => {
                const selectedSpecies = species?.find(specie => specie.id === value);
                return selectedSpecies?.breeds?.length > 0;
            },
            then: (schema) => schema.required('La raza es obligatoria'),
            otherwise: (schema) => schema.notRequired()
        }),
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
            species: pet?.specie_id || '',
            breed: pet?.breed_id || '',
            sex: pet?.gender || '',
            dateOfBirth: pet?.birthday_date || ''
        },
        validationSchema: PetSchema,
        onSubmit: async (values, { setSubmitting }) => {

            if (isCreating) {
                try {
                    const formData = new FormData();
                    formData.append('user_id', user?.id);
                    formData.append('specie_id', values.species);
                    if (selectedImage) formData.append("img_profile", selectedImage);
                    if (values.breed) {
                        formData.append('breed_id', values.breed);
                    }
                    formData.append('gender', values.sex);
                    formData.append('birthday_date', values.dateOfBirth);
                    formData.append('name', values.name);

                    const response = await createPet(formData);

                    if (response.data.success) {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Mascota añadida correctamente.',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: true
                            })
                        );
                        getMyPets()
                    } else {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Error al añadir mascota.',
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: true
                            })
                        );
                    }
                    setSubmitting(false);
                    onCancel();
                } catch (error) {
                    console.error(error);
                    setSubmitting(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Error al añadir mascota.',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: true
                        })
                    );
                } finally {
                    setSubmitting(false);
                }
            } else {
                //EDITAR MASCOTA
                try {
                    const formData = new FormData();
                    formData.append('user_id', user?.id);
                    formData.append('specie_id', values.species);
                    if (selectedImage) formData.append("img_profile", selectedImage);
                    if (values.breed) {
                        formData.append('breed_id', values.breed);
                    }
                    formData.append('gender', values.sex);
                    formData.append('birthday_date', values.dateOfBirth);
                    formData.append('name', values.name);

                    const response = await editPet(formData, pet?.uuid);

                    if (response.data.success) {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Mascota editada correctamente.',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: true
                            })
                        );
                        getMyPets()
                    } else {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Error al editar mascota.',
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: true
                            })
                        );
                    }

                    setSubmitting(false);
                    onCancel();
                } catch (error) {
                    console.error(error);
                    setSubmitting(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Error al añadir mascota.',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: true
                        })
                    );
                } finally {
                    setSubmitting(false);
                }
            }
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

    const handleSpeciesChange = (event) => {
        const speciesId = event.target.value;
        const selectedSpecies = species.find((specie) => specie.id === speciesId);
        setFieldValue('species', speciesId);
        setBreeds(selectedSpecies?.breeds || []);
        setFieldValue('breed', '');
    };

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Stack spacing={0.5} alignItems="center">
                                                    <Camera style={{ color: theme.palette.secondary.light, fontSize: '2rem' }} />
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
                                                {/* <TextField
                                                    fullWidth
                                                    id="pet-name"
                                                    placeholder="Ingrese el nombre de la mascota"
                                                    {...getFieldProps('name')}
                                                    error={Boolean(touched.name && errors.name)}
                                                    helperText={touched.name && errors.name}
                                                /> */}
                                                <Typography>
                                                    {pet.name}
                                                </Typography>
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
                                                        onChange={handleSpeciesChange}
                                                        input={<OutlinedInput id="select-pet-species" />}
                                                        error={Boolean(touched.species && errors.species)}
                                                    >
                                                        <MenuItem value="" disabled><Typography variant="subtitle1">Seleccione la especie</Typography></MenuItem>
                                                        {species && species.map((specie) => (
                                                            <MenuItem value={specie.id} key={specie.id}>{specie.name}</MenuItem>
                                                        ))}
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
                                                <FormControl fullWidth>
                                                    <Select
                                                        id="pet-breed"
                                                        displayEmpty
                                                        {...getFieldProps('breed')}
                                                        input={<OutlinedInput id="select-pet-breed" />}
                                                        error={Boolean(touched.breed && errors.breed)}
                                                    >
                                                        <MenuItem value="" disabled><Typography variant="subtitle1">Seleccione la raza</Typography></MenuItem>
                                                        {breeds && breeds.map((breed) => (
                                                            <MenuItem value={breed.id} key={breed.id}>{breed.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {touched.breed && errors.breed && (
                                                        <FormHelperText error>{errors.breed}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-sex">Género</InputLabel>
                                                <FormControl fullWidth>
                                                    <Select
                                                        id="pet-sex"
                                                        displayEmpty
                                                        {...getFieldProps('sex')}
                                                        input={<OutlinedInput id="select-pet-sex" />}
                                                        error={Boolean(touched.sex && errors.sex)}
                                                    >
                                                        <MenuItem value="" disabled><Typography variant="subtitle1">Seleccione el género</Typography></MenuItem>
                                                        <MenuItem value="male">Macho</MenuItem>
                                                        <MenuItem value="female">Hembra</MenuItem>
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
                                                    id="date"
                                                    type="date"
                                                    fullWidth
                                                    placeholder="MM/DD/YYYY"
                                                    {...getFieldProps('dateOfBirth')}
                                                    sx={{ mt: 1 }}
                                                    error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                                                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
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
                    </form>
                </LocalizationProvider>
            </FormikProvider>
            {/* {!isCreating && <AlertCustomerDelete title={pet} open={openAlert} handleClose={handleAlertClose} getPets={getMyPets} />} */}
        </>
    );
};

export default PetProfile;