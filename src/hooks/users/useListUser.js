import { useState } from "react";
import { useUserContext } from "./useUserContext";
import axios from "axios";

export const useListUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${Url}/list/users`);
      console.log(response.data);
      // update the Auth Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { listUser, isLoading, error };
};
