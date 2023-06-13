import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { LOGIN_API_URL } from "../utils/APIS";

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(LOGIN_API_URL, { email, password });
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
