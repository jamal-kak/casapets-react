import { useState } from "react";
import { usePetsContext } from "./usePetsContext";
import axios from "axios";

export const useUpdatePet = () => {
  const [isLoadingUpdatePet, setIsLoadingUpdatePet] = useState(null);
  const { dispatch } = usePetsContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updatePet = async (id, values) => {
    setIsLoadingUpdatePet(true);

    try {
      const response = await axios.post(`${Url}/pets`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      // update the Auth Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdatePet(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      setIsLoadingUpdatePet(false);
    }
  };

  return { updatePet, isLoadingUpdatePet };
};
