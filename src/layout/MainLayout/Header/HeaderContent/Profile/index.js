import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, ButtonBase, CardContent, ClickAwayListener, Grid, Paper, Popper, Stack, Tab, Tabs, Tooltip, Typography } from '@mui/material';

// project-imports
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';
import { ThemeMode } from 'config';

// assets
import avatar1 from 'assets/images/users/avatar-6.png';
import { Setting2, Profile, Logout } from 'iconsax-react';
import { useAuthStore } from 'store/useAuthStore';
import { formatToDate } from 'utils/petUtils';

// tab panel wrapper
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      sx={{ p: 1 }}
    >
      {value === index && children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setLogout, user } = useAuthStore();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      setLogout()
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={1.25} alignItems="left" sx={{ px: 2 }}>
          <Avatar alt="profile user" src={avatar1} />
          <Stack>
            <Typography variant="subtitle1" color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"} textAlign={"left"}>{user?.name ?? "Usuario"}</Typography>
            <Typography variant="body2" color="secondary" fontWeight={"600"} textAlign={"left"}>
              {user?.client_assistance_plan?.assistance_plan?.name || "Cliente"}
            </Typography>
          </Stack>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250
                },
                borderRadius: 1.5
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt="profile user" src={avatar1} />
                          <Stack>
                            <Typography variant="subtitle1">{user?.name || "Usuario"}</Typography>
                            <Typography variant="body2" color="secondary">
                              {user?.client_assistance_plan?.assistance_plan?.name || "Cliente"}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Salir">
                          <IconButton size="large" color="error" sx={{ p: 1 }} onClick={handleLogout}>
                            <Logout variant="Bulk" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize'
                        }}
                        icon={<Profile size={18} style={{ marginBottom: 0, marginRight: '10px' }} />}
                        label="Información del Plan"
                        {...a11yProps(0)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <Stack>
                      <Typography variant="body1" px={2} py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                        Plan: {user?.client_assistance_plan?.assistance_plan?.name || "Cliente"}
                      </Typography>
                      <Typography variant="body1" px={2} py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                        Total asistencias: {user?.client_assistance_plan?.assistance_plan?.assistance_total || ""}
                      </Typography>
                      <Typography variant="body1" px={2} py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                        Asistencias solicitadas: {user?.client_assistance_plan?.count_assistance_used || ""}
                      </Typography>
                      <Typography variant="body1" px={2} py={0.3} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                        Periodo plan:
                      </Typography>
                      <Typography variant="body1" px={2} py={0.3} mb={0.5} color={theme.palette.mode === ThemeMode.LIGHT ? "black" : "white"}>
                        {formatToDate(user?.client_assistance_plan?.start_date_period) || ""} -  {formatToDate(user?.client_assistance_plan?.end_date_period) || ""}
                      </Typography>
                    </Stack>
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default ProfilePage;
