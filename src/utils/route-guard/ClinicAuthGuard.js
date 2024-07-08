import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import useAuth from 'hooks/useAuth';
import useClinicStore from 'store/useClinicStore';

// ==============================|| AUTH GUARD ||============================== //

const ClinicAuthGuard = ({ children }) => {
    const { user } = useClinicStore();
    const isLoggedIn = Boolean(user)
    // console.log(user)
    // console.log(isLoggedIn)
    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/clinic/login', {
                state: {
                    from: location.pathname
                },
                replace: true
            });
        }
    }, [isLoggedIn, navigate, location]);

    return children;
};

ClinicAuthGuard.propTypes = {
    children: PropTypes.node
};

export default ClinicAuthGuard;
