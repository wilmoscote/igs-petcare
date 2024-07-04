// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CircularProgress, Dialog, Grid, Stack, Typography } from '@mui/material';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';

import RepeatCustomerRate from 'sections/widget/chart/RepeatCustomerRate';
import ProjectOverview from 'sections/widget/chart/ProjectOverview';
import ProjectRelease from 'sections/dashboard/default/ProjectRelease';
import AssignUsers from 'sections/widget/statistics/AssignUsers';

import Transactions from 'sections/widget/data/Transactions';
import TotalIncome from 'sections/widget/chart/TotalIncome';

// assets
import { Add, ArrowDown, ArrowUp, Book, Briefcase, Calendar, CloudChange, Wallet3 } from 'iconsax-react';
import WelcomeBanner from 'sections/dashboard/default/WelcomeBanner';
import { FormattedMessage } from 'react-intl';
import CustomerCard from 'sections/apps/customer/CustomerCard';
import NoPetsMessage from 'components/NoPetsMessage';
import { useEffect, useState } from 'react';
import { PopupTransition } from 'components/@extended/Transitions';
import AddPet from 'components/AddPet';
import { mockPetsData as data } from 'utils/mockData';
import useAuth from 'hooks/useAuth';
import { useAuthStore } from 'store/useAuthStore';

const DashboardDefault = () => {
  const theme = useTheme();
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState(null)
  const { getPets } = useAuth();
  const [mockPetsData, setMockPetsData] = useState(data)
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
  };

  const getMyPets = async () => {
    try {
      setLoading(true)
      const response = await getPets();
      // console.log(response.data)
      if (response.data?.success) {
        setPets(response.data?.data)
      } else {
        console.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMyPets()
  }, [])

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h2">
          <FormattedMessage id="my-pets" />
        </Typography>

        {pets && pets?.length > 0 && (
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            <FormattedMessage id="add-pet" />
          </Button>
        )}
      </Grid>

      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", py: 10, width: "100%", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {pets && pets?.length > 0 ? (
            pets?.map(pet =>
              <Grid item xs={12} sm={6} lg={3} key={pet.id}>
                <CustomerCard customer={pet} getPets={getMyPets} />
              </Grid>
            )
          ) : (
            <Grid item xs={12} >
              <NoPetsMessage handleAdd={handleAdd} />
            </Grid>
          )}
        </>
      )
      }
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddPet onCancel={handleAdd} getMyPets={getMyPets} />
      </Dialog>
    </Grid >
  );
};

export default DashboardDefault;
