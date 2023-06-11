import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";

export const useSetAsUser = () => {
  const [isLoadingSetAsUser, setIsLoadingSetAsUser] = useState(null);
  const { dispatch } = useVetContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const setAsUser = async (id) => {
    setIsLoadingSetAsUser(true);

    try {
      const response = await axios.post(`${Url}/create/${id}`);
      console.log(response.data);
      // update the Vet Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingSetAsUser(false);
    } catch (error) {
      setIsLoadingSetAsUser(false);
      console.log(error.response.data);
      await dispatch({ type: "MODIFIER", payload: error.response.data });
    }
  };

  return { setAsUser, isLoadingSetAsUser };
};
