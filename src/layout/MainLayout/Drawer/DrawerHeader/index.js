import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, useMediaQuery } from '@mui/material';
import Profile from '../../Header/HeaderContent/Profile';
// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled';
import { MenuOrientation } from 'config';

import Logo from 'components/logo';
import { DRAWER_WIDTH, HEADER_HEIGHT } from 'config';
import useConfig from 'hooks/useConfig';
import IgsLogo from 'assets/images/auth/igsLogo.svg';
// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        // backgroundColor: "white",
        minHeight: isHorizontal ? 'unset' : HEADER_HEIGHT,
        width: isHorizontal ? { xs: '100%', lg: DRAWER_WIDTH + 50 } : 'inherit',
        paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '8px',
        paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: open ? "center" : "center", width: "100%" }}>
        <img src={IgsLogo} alt="IGS Logo" width={50} style={{ marginTop: "50px", marginBottom: "30px" }} />

      <Divider />
      </Box>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
