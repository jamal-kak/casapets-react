import React, { useState, createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { SERVICE_API_URL } from '../UTILS/APIS';

import CustomSnackbar from '../scenes/global/snackbar'



const initialState = {
  services: [],
  loading: true,
  error: null,
};

export const ServicesContext = createContext({
  services: [],
  loading: true,
  error: null,
  fetchServices: () => {},
});


const servicesReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SERVICES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SERVICES_SUCCESS':
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    case 'FETCH_SERVICES_FAILURE':
      return {
        ...state,
        services: [],
        loading: false,
        error: action.payload,
      };
    case 'ADD_SERVICES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_SERVICES_SUCCESS':
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    case 'ADD_SERVICES_FAILURE':
      return {
        ...state,
        services: [],
        loading: false,
        error: action.payload,
      };
    case 'EDIT_SERVICES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'EDIT_SERVICES_SUCCESS':
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    case 'EDIT_SERVICES_FAILURE':
      return {
        ...state,
        services: [],
        loading: false,
        error: action.payload,
      };
    case 'DELETE_SERVICES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'DELETE_SERVICES_SUCCESS':
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    case 'DELETE_SERVICES_FAILURE':
      return {
        ...state,
        services: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ServicesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(servicesReducer, initialState);

  const fetchServices = async (url) => {
    dispatch({ type: 'FETCH_SERVICES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    try {
      const response = await axios.get(url);
      dispatch({ type: 'FETCH_SERVICES_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_SERVICES_FAILURE', payload: error.message });
    }
  };

  const addService = async (name,reference,type,status) => {
    

    dispatch({ type: 'ADD_SERVICES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    const newService = {
      "reference": reference,
      "title": name,
      "type_key": type,
      "status_key": status
  }


    try {
      const response = await axios.post(SERVICE_API_URL, JSON.stringify(newService), {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchServices(SERVICE_API_URL);
      handleSnackbar('Service added successfully', 'success');
    } catch (error) {
      dispatch({ type: 'ADD_SERVICES_FAILURE', payload: error.message });
      handleSnackbar('Failed to add service', 'error');
      
    }
  };
  const editService = async (name,reference,type,status,serviceID , setOpen) => {
    

    dispatch({ type: 'EDIT_SERVICES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    const newService = {
      "reference": reference,
      "title": name,
      "type_key": type,
      "status_key": status
  }

    console.log(newService);

    try {
      const response = await axios.patch(SERVICE_API_URL+serviceID, JSON.stringify(newService), {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchServices(SERVICE_API_URL);
      handleSnackbar('Service edited successfully', 'success');
      setOpen(false);
    } catch (error) {
      dispatch({ type: 'EDIT_SERVICES_FAILURE', payload: error.message });
      handleSnackbar('Failed to edit the service', 'error');

    }
  };
  const deleteService = async (serviceID, setOpenDeleteDialogue) => {
    

    dispatch({ type: 'DELETE_SERVICES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;


    try {
      const response = await axios.delete(SERVICE_API_URL+serviceID);
      fetchServices(SERVICE_API_URL);
      setOpenDeleteDialogue(false);
      handleSnackbar('Service deleted successfully', 'success');

    } catch (error) {
      dispatch({ type: 'DELETE_SERVICES_FAILURE', payload: error.message });
      handleSnackbar('Failed to delete service', 'error');

    }
  };

  const nextPage = () => {
    fetchServices(state.services.next);
  };

  const prevPage = () => {
    fetchServices(state.services.prev);
  };

  useEffect(() => {
    fetchServices(SERVICE_API_URL); // Call fetchServices on component mount
  }, []);



  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };


  return (
    <ServicesContext.Provider
      value={{
        services: state.services,
        loading: state.loading,
        error: state.error,
        fetchServices: fetchServices,
        addService: addService,
        editService:editService,
        deleteService:deleteService,
        nextPage: nextPage,
        prevPage: prevPage,
        
      }}
    >
      {children}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </ServicesContext.Provider>
  );
};
