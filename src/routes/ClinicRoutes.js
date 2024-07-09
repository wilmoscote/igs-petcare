import { lazy } from 'react';

// project-imports
import ClinicLayout from 'layout/ClinicLayout';
import Loadable from 'components/Loadable';
import Login from 'pages/auth/auth1/login';
import { element } from 'prop-types';
import ClinicAuthGuard from 'utils/route-guard/ClinicAuthGuard';


const Agenda = Loadable(lazy(() => import('pages/apps/calendar')));

const ClinicDashboard = Loadable(lazy(() => import('pages/clinic/ClinicDashboard')));
// ==============================|| MAIN ROUTES ||============================== //

const ClinicRoutes = {
  path: 'clinic',
  children: [
    {
      path: '',
      element: <Login />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      element: (
        <ClinicAuthGuard>
          <ClinicLayout />
        </ClinicAuthGuard>
      ),
      path: 'dashboard',
      children: [
        {
          path: 'agenda',
          element: <Agenda />
        },
        {
          path: 'home',
          element: <ClinicDashboard />
        },
      ]
    },
  ]
};

export default ClinicRoutes;
