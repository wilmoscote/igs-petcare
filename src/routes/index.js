import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project-imports
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ClinicRoutes from './ClinicRoutes';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('pages/landing')));

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    MainRoutes,
    LoginRoutes,
    // ClinicRoutes,
    ComponentsRoutes,
  ]);
}
