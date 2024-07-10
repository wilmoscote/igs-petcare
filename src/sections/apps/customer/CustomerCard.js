import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project-imports
import CustomerPreview from './CustomerPreview';
import AlertCustomerDelete from './AlertCustomerDelete';
import AddCustomer from 'sections/apps/customer/AddCustomer';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import ListSmallCard from './export-pdf/ListSmallCard';

// assets
import { Briefcase, CallCalling, Link2, Location, Man, More, Sms, Woman } from 'iconsax-react';
import AddPet from 'components/AddPet';
import usePetStore from 'store/usePetStore';
import { useNavigate } from 'react-router';

import { formatAge } from 'utils/petUtils';
import { ThemeMode } from 'config';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| CUSTOMER - CARD ||============================== //

const CustomerCard = ({ customer, getPets }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setSelectedPet } = usePetStore();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <>
      <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
        <Grid id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" color="secondary" onClick={handleMenuClick}>
                    <More style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={customer.name} src={customer.img_profile ? customer.img_profile : avatarImage(`./avatar-${Math.floor((Math.random() * 8) + 1)}.png`)} />
                </ListItemAvatar>
                <Box>
                  <ListItemText
                    primary={<Typography variant="subtitle1" color={customer.gender === "male" ? "#2CCCE4" : "#F47373"} >{customer.name} {customer.gender === "male" ? <Man size="13" /> : <Woman size="13" />} </Typography>}
                    secondary={<Typography color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} mt={0.3}>{customer.specie?.name || ""}, {customer.breed?.name || ""}</Typography>}
                    sx={{ mb: 0 }}
                  />
                  <Typography color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} mt={0.3}>{formatAge(customer.birthday_date) || ""}</Typography>
                </Box>
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              {/* <MenuItem sx={{ a: { textDecoration: 'none', color: 'inherit' } }}>
                <PDFDownloadLink document={<ListSmallCard customer={customer} />} fileName={`Customer-${customer.fatherName}.pdf`}>
                  Export PDF
                </PDFDownloadLink>
              </MenuItem> */}
              <MenuItem onClick={(e) => {
                handleAdd()
                handleMenuClose()
              }}>Editar</MenuItem>
              <MenuItem onClick={() => {
                handleAlertClose()
                handleMenuClose()
              }}>Eliminar</MenuItem>
            </Menu>
          </Grid>
          {/* <Grid item xs={12}>
            <Divider />
          </Grid> */}
          <Grid item xs={12}>
            <Button fullWidth startIcon={<Briefcase />} variant="contained" size="large"
              onClick={() => {
                setSelectedPet(customer);
                navigate("/services");
              }}
            >
              Ver servicios
            </Button>
          </Grid>
        </Grid>
      </MainCard>

      {/* edit customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddPet pet={customer} onCancel={handleAdd} getMyPets={getPets} />
      </Dialog>
      {/* <CustomerPreview customer={customer} open={open} onClose={handleClose} /> */}
      <AlertCustomerDelete title={customer} open={openAlert} handleClose={handleAlertClose} getPets={getPets} />
    </>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.object
};

export default CustomerCard;
