import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const Url = "http://127.0.0.1:8000/api";
  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${Url}/login`, { email, password });
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // update the Auth Context
      dispatch({ type: "LOGIN", payload: response.data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.errors.email[0]);
    }
  };

  return { signin, isLoading, error };
};
