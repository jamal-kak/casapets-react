import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { RACES_API_URL } from '../UTILS/APIS';



const initialState = {
  races: [],
  loading: true,
  error: null,
};

export const RacesContext = createContext({
  races: [],
  loading: true,
  error: null,
  fetchRaces: () => {},
});


const racesReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RACES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_RACES_SUCCESS':
      return {
        ...state,
        races: action.payload,
        loading: false,
      };
    case 'FETCH_RACES_FAILURE':
      return {
        ...state,
        races: [],
        loading: false,
        error: action.payload,
      };
    case 'ADD_RACES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_RACES_SUCCESS':
      return {
        ...state,
        races: action.payload,
        loading: false,
      };
    case 'ADD_RACES_FAILURE':
      return {
        ...state,
        races: [],
        loading: false,
        error: action.payload,
      };
    case 'EDIT_RACES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'EDIT_RACES_SUCCESS':
      return {
        ...state,
        races: action.payload,
        loading: false,
      };
    case 'EDIT_RACES_FAILURE':
      return {
        ...state,
        races: [],
        loading: false,
        error: action.payload,
      };
    case 'DELETE_RACES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'DELETE_RACES_SUCCESS':
      return {
        ...state,
        races: action.payload,
        loading: false,
      };
    case 'DELETE_RACES_FAILURE':
      return {
        ...state,
        races: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const RacesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(racesReducer, initialState);

  const fetchRaces = async (url) => {
    dispatch({ type: 'FETCH_RACES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    try {
      const response = await axios.get(url);
      dispatch({ type: 'FETCH_RACES_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_RACES_FAILURE', payload: error.message });
    }
  };

  const addRace = async (raceName, raceType) => {
    

    dispatch({ type: 'ADD_RACES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    const newRace = {
      "name": raceName,
      "type": raceType
    }

    console.log(newRace);

    try {
      const response = await axios.post(RACES_API_URL, JSON.stringify(newRace), {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchRaces(RACES_API_URL);
    } catch (error) {
      dispatch({ type: 'ADD_RACES_FAILURE', payload: error.message });
    }
  };
  const editRace = async (raceName, raceType,raceID , setOpen) => {
    

    dispatch({ type: 'EDIT_RACES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    const newRace = {
      "name": raceName,
      "type": raceType
    }

    console.log(newRace);

    try {
      const response = await axios.patch(RACES_API_URL+raceID, JSON.stringify(newRace), {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchRaces(RACES_API_URL);
      setOpen(false);
    } catch (error) {
      dispatch({ type: 'EDIT_RACES_FAILURE', payload: error.message });
    }
  };
  const deleteRace = async (raceID, setOpenDeleteDialogue) => {
    

    dispatch({ type: 'DELETE_RACES_REQUEST' });

    const access_token = JSON.parse(localStorage.getItem('user'))['access_token'];
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;


    try {
      const response = await axios.delete(RACES_API_URL+raceID);
      fetchRaces(RACES_API_URL);
      setOpenDeleteDialogue(false);
    } catch (error) {
      dispatch({ type: 'DELETE_RACES_FAILURE', payload: error.message });
    }
  };

  const nextPage = () => {
    fetchRaces(state.races.next);
  };

  const prevPage = () => {
    fetchRaces(state.races.prev);
  };

  useEffect(() => {
    fetchRaces(RACES_API_URL); // Call fetchRaces on component mount
  }, []);

  return (
    <RacesContext.Provider
      value={{
        races: state.races,
        loading: state.loading,
        error: state.error,
        fetchRaces: fetchRaces,
        addRace: addRace,
        editRace:editRace,
        deleteRace:deleteRace,
        nextPage: nextPage,
        prevPage: prevPage
      }}
    >
      {children}
    </RacesContext.Provider>
  );
};
