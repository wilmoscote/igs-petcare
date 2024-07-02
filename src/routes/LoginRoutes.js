import { lazy } from 'react';

// project-imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import Login from 'pages/auth/auth1/login';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth2/login2')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/auth2/register2')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth2/forgot-password2')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth2/check-mail2')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/auth2/reset-password2')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth2/code-verification2')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        },
        {
          path: 'login-clinic',
          element: <Login />
        },
      ]
    }
  ]
};

export default LoginRoutes;
