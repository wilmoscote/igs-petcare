import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useMediaQuery, Button, ButtonGroup, Grid, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// project-imports
import IconButton from 'components/@extended/IconButton';

// assets
import { ArrowLeft2, ArrowRight2, Calendar1, Category, Grid6, TableDocument } from 'iconsax-react';

// constant
const viewOptions = [
  {
    label: 'Mes',
    value: 'dayGridMonth',
    icon: Category
  },
  {
    label: 'Semana',
    value: 'timeGridWeek',
    icon: Grid6
  },
  {
    label: 'Dia',
    value: 'timeGridDay',
    icon: Calendar1
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: TableDocument
  }
];

// ==============================|| CALENDAR - TOOLBAR ||============================== //

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, activeFilter, onChangeFilter, ...others }) => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [viewFilter, setViewFilter] = useState(viewOptions);

  useEffect(() => {
    if (matchDownSM) {
      const filter = viewOptions.filter((item) => item.value !== 'dayGridMonth' && item.value !== 'timeGridWeek');
      setViewFilter(filter);
    } else {
      setViewFilter(viewOptions);
    }
  }, [matchDownSM]);

  return (
    <Grid alignItems="center" container justifyContent="space-between" spacing={matchDownSM ? 1 : 3} {...others} sx={{ pb: 3 }}>
      <Grid item>
        <Button variant="outlined" onClick={onClickToday} size={matchDownSM ? 'small' : 'medium'}>
          Hoy
        </Button>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={matchDownSM ? 1 : 3}>
          <IconButton onClick={onClickPrev} size={matchDownSM ? 'small' : 'large'}>
            <ArrowLeft2 />
          </IconButton>
          <Typography variant={matchDownSM ? 'h5' : 'h3'} color="textPrimary">
            {format(date, 'MMMM yyyy', { locale: es })}
          </Typography>
          <IconButton onClick={onClickNext} size={matchDownSM ? 'small' : 'large'}>
            <ArrowRight2 />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction={"row"} spacing={2}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              size={matchDownSM ? 'small' : 'large'}
              disableElevation
              variant={activeFilter === "active" ? 'contained' : 'outlined'}
              onClick={() => onChangeFilter("active")}
            >
              Activas
            </Button>
            <Button
              size={matchDownSM ? 'small' : 'large'}
              disableElevation
              variant={activeFilter === "inactive" ? 'contained' : 'outlined'}
              onClick={() => onChangeFilter("inactive")}
            >
              Cumplidas
            </Button>
            <Button
              size={matchDownSM ? 'small' : 'large'}
              disableElevation
              variant={activeFilter === null ? 'contained' : 'outlined'}
              onClick={() => onChangeFilter(null)}
            >
              Todas
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" aria-label="outlined button group">
            {viewFilter.map((viewOption) => {
              const Icon = viewOption.icon;
              return (
                <Tooltip title={viewOption.label} key={viewOption.value}>
                  <Button
                    size={matchDownSM ? 'small' : 'large'}
                    disableElevation
                    variant={viewOption.value === view ? 'contained' : 'outlined'}
                    onClick={() => onChangeView(viewOption.value)}
                  >
                    <Icon variant={viewOption.value === view ? 'Bold' : 'Linear'} />
                  </Button>
                </Tooltip>
              );
            })}
          </ButtonGroup>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
