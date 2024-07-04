import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project-imports
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { Trash } from 'iconsax-react';
import { useState } from 'react';
import LoadingButton from 'components/@extended/LoadingButton';
import useAuth from 'hooks/useAuth';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertCustomerDelete({ title, open, handleClose, getPets }) {
  const [loading, setLoading] = useState(false)
  const { deletePet } = useAuth();

  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await deletePet(title.uuid);
      console.log(response.data)
      if (response.data?.success) {
        // setPets(response.data?.data)
        if (response.data?.success) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Mascota eliminada correctamente.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: true
            })
          );
          getPets()
        }
        handleClose(true)
      } else {
        console.error(response.data.message)
        dispatch(
          openSnackbar({
            open: true,
            message: 'Error al eliminar mascota.',
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: true
          })
        );
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <Trash variant="Bold" />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              ¿Está seguro que desea eliminar esta mascota?
            </Typography>
            <Typography align="center">
              <Typography variant="h5" component="span">{title?.name}
              </Typography>
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button disabled={loading} fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <LoadingButton loading={loading} fullWidth color="error" variant="contained" onClick={handleDelete} autoFocus>
              Eliminar
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

AlertCustomerDelete.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
