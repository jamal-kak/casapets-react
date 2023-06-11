import { useState } from "react";
import { usePetsContext } from "./usePetsContext";
import axios from "axios";

export const useDeletePet = () => {
  const [isLoadingDeletePet, setIsLoadingDeletePet] = useState(null);
  const { dispatch } = usePetsContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deletePet = async (id) => {
    setIsLoadingDeletePet(true);

    try {
      const response = await axios.delete(`${Url}/pets/${id}`);
      console.log(response.data);
      // update the Auth Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeletePet(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeletePet(false);
    }
  };

  return { deletePet, isLoadingDeletePet };
};
