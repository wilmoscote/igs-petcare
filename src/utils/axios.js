import axios from 'axios';
import { dispatch } from 'store';
import { LOGOUT } from 'store/reducers/actions';
import { useAuthStore } from 'store/useAuthStore';
import useClinicStore from 'store/useClinicStore';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'https://apiveterinary.3fixesdev.com/api' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      if (window.location.href.includes('/clinic')) {
        const currentTokens = useClinicStore.getState();
        const { setLogout } = currentTokens;
        setLogout()
        dispatch({ type: LOGOUT });
        window.location.pathname = '/clinic/login';
      } else {
        const currentTokens = useAuthStore.getState();
        const { setLogout } = currentTokens;
        setLogout()
        dispatch({ type: LOGOUT });
        window.location.pathname = '/login';
      }
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;
