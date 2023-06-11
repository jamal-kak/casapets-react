import React, { useState, createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { BOX_API_URL } from '../UTILS/APIS';

import CustomSnackbar from '../scenes/global/snackbar'



const initialState = {
  boxs: [],
  loading: true,
  error: null,
};

export const BoxsContext = createContext({
  boxs: [],
  loading: true,
  error: null,
  fetchBoxs: () => {},
});


const boxsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BOXS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_BOXS_SUCCESS':
      return {
        ...state,
        boxs: action.payload,
        loading: false,
      };
    case 'FETCH_BOXS_FAILURE':
      return {
        ...state,
        boxs: [],
        loading: false,
        error: action.payload,
      };
    case 'ADD_BOXS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_BOXS_SUCCESS':
      return {
        ...state,
        boxs: action.payload,
        loading: false,
      };
    case 'ADD_BOXS_FAILURE':
      return {
        ...state,
        boxs: [],
        loading: false,
        error: action.payload,
      };
    case 'EDIT_BOXS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'EDIT_BOXS_SUCCESS':
      return {
        ...state,
        boxs: action.payload,
        loading: false,
      };
    case 'EDIT_BOXS_FAILURE':
      return {
        ...state,
        boxs: [],
        loading: false,
        error: action.payload,
      };
    case 'DELETE_BOXS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'DELETE_BOXS_SUCCESS':
      return {
        ...state,
        boxs: action.payload,
        loading: false,
      };
    case 'DELETE_BOXS_FAILURE':
      return {
        ...state,
        boxs: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const BoxsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boxsReducer, initialState);

  const fetchBoxs = async (url) => {
    dispatch({ type: 'FETCH_BOXS_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    try {
      const response = await axios.get(url);
      dispatch({ type: 'FETCH_BOXS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_BOXS_FAILURE', payload: error.message });
    }
  };

  const addBox = async (boxName, boxType) => {
    

    dispatch({ type: 'ADD_BOXS_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    const newBox = {
      "libelle": boxName,
      "type": boxType
    }


    try {
      const response = await axios.post(BOX_API_URL, JSON.stringify(newBox), {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchBoxs(BOX_API_URL);
      handleSnackbar('Box added successfully', 'success');
    } catch (error) {
      dispatch({ type: 'ADD_BOXS_FAILURE', payload: error.message });
      handleSnackbar('Failed to add box', 'error');
      
    }
  };
  const editBox = async (boxName, boxType,boxID , setOpen) => {
    

    dispatch({ type: 'EDIT_BOXS_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    const newBox = {
      "libelle": boxName,
      "type": boxType
    }

    console.log(newBox);

    try {
      const response = await axios.patch(BOX_API_URL+boxID, JSON.stringify(newBox), {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchBoxs(BOX_API_URL);
      handleSnackbar('Box edited successfully', 'success');
      setOpen(false);
    } catch (error) {
      dispatch({ type: 'EDIT_BOXS_FAILURE', payload: error.message });
      handleSnackbar('Failed to edit the box', 'error');

    }
  };
  const deleteBox = async (boxID, setOpenDeleteDialogue) => {
    

    dispatch({ type: 'DELETE_BOXS_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;


    try {
      const response = await axios.delete(BOX_API_URL+boxID);
      fetchBoxs(BOX_API_URL);
      setOpenDeleteDialogue(false);
      handleSnackbar('Box deleted successfully', 'success');

    } catch (error) {
      dispatch({ type: 'DELETE_BOXS_FAILURE', payload: error.message });
      handleSnackbar('Failed to delete box', 'error');

    }
  };

  const nextPage = () => {
    fetchBoxs(state.boxs.next);
  };

  const prevPage = () => {
    fetchBoxs(state.boxs.prev);
  };

  useEffect(() => {
    fetchBoxs(BOX_API_URL); // Call fetchBoxs on component mount
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
    <BoxsContext.Provider
      value={{
        boxs: state.boxs,
        loading: state.loading,
        error: state.error,
        fetchBoxs: fetchBoxs,
        addBox: addBox,
        editBox:editBox,
        deleteBox:deleteBox,
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
    </BoxsContext.Provider>
  );
};
