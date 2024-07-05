import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import useAuth from 'hooks/useAuth';
import { useAuthStore } from 'store/useAuthStore';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { user } = useAuthStore();
  const isLoggedIn = Boolean(user)
  console.log(user)
  console.log(isLoggedIn)
  // const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
