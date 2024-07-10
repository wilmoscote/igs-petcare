import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Badge,
    Box,
    ClickAwayListener,
    Link,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Moon, Sun1 } from 'iconsax-react';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import { ThemeMode } from 'config';

// assets
import { Gift, MessageText1, Notification, Setting2 } from 'iconsax-react';
import Avatar from 'components/@extended/Avatar';
import useConfig from 'hooks/useConfig';

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

const ThemeButton = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const { mode, onChangeMode } = useConfig();
    const anchorRef = useRef(null);
    const [read] = useState(2);
    const [open, setOpen] = useState(false);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        onChangeMode(theme.palette.mode === ThemeMode.LIGHT ? ThemeMode.NIGHT : ThemeMode.LIGHT);
    };

    const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'secondary.200' : 'secondary.200';
    const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

    return (
        <Box sx={{ flexShrink: 0, ml: 0.5 }}>
            <IconButton
                color="secondary"
                variant="light"
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                size="large"
                sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
            >
                {theme.palette.mode === ThemeMode.LIGHT ? <Sun1 /> : <Moon />}
            </IconButton>
        </Box>
    )
}

export default ThemeButton