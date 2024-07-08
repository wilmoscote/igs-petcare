import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { useAuthStore } from 'store/useAuthStore';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  try {
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
  } catch (err) {
    return false
  }
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get('/api/account/me');
          const { user } = response.data;

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (user, token) => {
    // const response = await axios.post('/api/account/login', { email, password });
    const userData = {
      ...user,
      token: token
    }
    // const { serviceToken, user } = response.data;
    setSession(userData);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        userData
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async () => { };

  const updateProfile = () => { };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  const createOtp = async (email, dni) => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    const body = {
      email: email,
      dni: dni
    };

    return axios.post(`/otp/create`, body, config);
  }

  const validateOtp = async (email, dni, otp) => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    const body = {
      email: email,
      dni: dni,
      otp_code: otp
    };

    return axios.post(`/login`, body, config);
  }

  const getPets = async () => {
    const currentTokens = useAuthStore.getState();
    const { token, user } = currentTokens;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.get(`/pet/user/list/${user?.uuid}`, config);
  }

  const getSpecies = async () => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.get(`/pet/specie/list`, config);
  }

  const createPet = async (data) => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.post(`/pet/create`, data, config);
  }

  const editPet = async (data, uuid) => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.post(`/pet/update/${uuid}`, data, config);
  }

  const deletePet = async (uuid) => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.delete(`/pet/delete/${uuid}`, config);
  }

  const getClinics = async () => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.get(`/clinic/list`, config);
  }

  const getServices = async () => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.get(`/services/list`, config);
  }

  const createSchedule = async (data) => {
    const currentTokens = useAuthStore.getState();
    const { token } = currentTokens;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.post(`/clinic/booking/create`, data, config);
  }

  const getBookingList = async (status = "active", pagination = "10") => {
    const currentTokens = useAuthStore.getState();
    const { token, user } = currentTokens;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ""}`
      }
    };

    return axios.get(`/clinic/booking/user/list/${user?.uuid}?status=${status}&pagination=${pagination}`, config);
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, createOtp, validateOtp, getPets, getSpecies, createPet, deletePet, editPet, getClinics, getServices, createSchedule, getBookingList }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
