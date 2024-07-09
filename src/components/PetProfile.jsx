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
    Typography,
    CircularProgress
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _, { values } from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project-imports

import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { ThemeMode } from 'config';

// assets
import { ArrowLeft, ArrowRight, Camera, Pet, Trash } from 'iconsax-react';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';
import useAuth from 'hooks/useAuth';
import { useAuthStore } from 'store/useAuthStore';
import { mockAppoinmentData } from 'utils/mock-data';
import ClinicAppointmentCard from './ClinicAppointmentCard';
import { genderName } from 'utils/petUtils';
import PetHistoryAppointmentCard from './PetHistoryAppointmentCard';

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
    const { getPetBookingList } = useAuth();
    const theme = useTheme();
    const isCreating = !pet;
    const [species, setSpecies] = useState(null);
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(undefined);
    const [avatar, setAvatar] = useState(pet?.img_profile ? pet?.img_profile : null);
    const [data, setData] = useState(mockAppoinmentData)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (selectedImage) {
            setAvatar(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const PetSchema = Yup.object().shape({
        name: Yup.string().max(255).required('El nombre es obligatorio'),
    });

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

    const getBookingList = async () => {
        setLoading(true);
        try {
            const response = await getPetBookingList(pet?.uuid, 10, currentPage);
            console.log(response.data)
            if (response.data.success) {
                setData(response.data.data.data)
                setTotalPages(response.data.data.last_page);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBookingList()
    }, [currentPage])

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>Perfil de Mascota</DialogTitle>
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
                                        </FormLabel>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-name">Nombre</InputLabel>
                                                <Typography color="black" variant="body1" sx={{ fontWeight: "500" }}>
                                                    {pet.name}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-species">Especie</InputLabel>
                                                <Typography color="black" variant="body1" sx={{ fontWeight: "500" }}>
                                                    {pet.specie.name}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-breed">Raza</InputLabel>
                                                <Typography color="black" variant="body1" sx={{ fontWeight: "500" }}>{pet.breed.name}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-sex">Género</InputLabel>
                                                <Typography color="black" variant="body1" sx={{ fontWeight: "500" }}>{genderName(pet.gender)}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-dateOfBirth">Fecha de Nacimiento</InputLabel>
                                                <Typography color="black" variant="body1" sx={{ fontWeight: "500" }}>{pet.birthday_date}</Typography>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="pet-dateOfBirth"><strong>Historial de consultas:</strong></InputLabel>
                                                <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                    {loading ? (
                                                        <Box sx={{ display: "flex", my: 5, justifyContent: "center", alignItems: "center" }}>
                                                            <CircularProgress />
                                                        </Box>
                                                    ) : (
                                                        data.map((appointment) => (
                                                            <PetHistoryAppointmentCard appointment={appointment} key={appointment.id} />
                                                        ))
                                                    )}
                                                </Box>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Button onClick={handlePreviousPage} disabled={currentPage === 1} startIcon={<ArrowLeft />}>
                                                    Anterior
                                                </Button>
                                                <Button onClick={handleNextPage} disabled={currentPage === totalPages} endIcon={<ArrowRight />}>
                                                    Siguiente
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ p: 2.5 }}>
                            <Grid container justifyContent="right" alignItems="center">
                                <Grid item>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Button color="primary" variant="contained" onClick={onCancel}>
                                            Volver
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </form>
                </LocalizationProvider>
            </FormikProvider>
        </>
    );
};

export default PetProfile;