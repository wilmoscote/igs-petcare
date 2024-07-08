import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import Login from 'pages/auth/auth1/login';
import { element } from 'prop-types';


const Agenda = Loadable(lazy(() => import('pages/apps/calendar')));
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
      path: 'agenda',
      element: <Agenda />
    },
  ]
};

export default ClinicRoutes;
