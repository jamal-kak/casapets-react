import { useState } from "react";
import { useUserContext } from "./useUserContext";
import axios from "axios";

export const useAddUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addUser = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${Url}/register`, values);
      console.log(response.data);
      // update the Auth Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  return { addUser, isLoading, error };
};
