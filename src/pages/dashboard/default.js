// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, Grid, Stack, Typography } from '@mui/material';

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
import { useState } from 'react';
import dogMemoji from 'assets/images/pets/dogMemoji.webp'
import catMemoji from 'assets/images/pets/catMemoji.webp'
import catMemoji1 from 'assets/images/pets/catMemoji1.webp'
import { PopupTransition } from 'components/@extended/Transitions';
import AddPet from 'components/AddPet';

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const data = [
  {
    id: 1,
    name: 'Roku',
    species: 'Perro',
    breed: 'Labrador',
    sex: 'Male',
    dateOfBirth: '01/01/2020',
    avatar: dogMemoji
  },
  {
    id: 2,
    name: 'Max',
    species: 'Perro',
    breed: 'Golden Retriever',
    sex: 'Male',
    dateOfBirth: '02/15/2018',
    avatar: dogMemoji
  },
  {
    id: 4,
    name: 'Venus',
    species: 'Perro',
    breed: 'Puddle',
    sex: 'Male',
    dateOfBirth: '11/11/2018',
    avatar: dogMemoji
  },
  {
    id: 3,
    name: 'Luna',
    species: 'Gato',
    breed: 'Persian',
    sex: 'Female',
    dateOfBirth: '05/10/2019',
    avatar: catMemoji1
  }
];

const DashboardDefault = () => {
  const theme = useTheme();
  const [mockPetsData, setMockPetsData] = useState(data)
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
  };
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h2">
          <FormattedMessage id="my-pets" />
        </Typography>
        {mockPetsData && mockPetsData.length > 0 && (
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            <FormattedMessage id="add-pet" />
          </Button>
        )}
      </Grid>
      {mockPetsData && mockPetsData.length > 0 ? (
        mockPetsData.map(pet =>
          <Grid item xs={12} sm={6} lg={3} key={pet.id}>
            <CustomerCard customer={pet} />
          </Grid>
        )
      ) : (
        <Grid item xs={12} >
          <NoPetsMessage />
        </Grid>
      )}
      {/* <Grid item xs={12}>
        <Button fullWidth startIcon={<Briefcase />} variant="contained" size="large">
          Ver servicios
        </Button>
      </Grid> */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddPet onCancel={handleAdd} />
      </Dialog>
    </Grid>
  );
};

export default DashboardDefault;
