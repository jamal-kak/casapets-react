import { useState } from "react";
import { usePetsContext } from "./usePetsContext";
import axios from "axios";
import { PETS_API_URL } from "../../utils/APIS";

export const useFindPet = () => {
  const [isLoadingFindPet, setIsLoadingFindPet] = useState(null);
  const { dispatch } = usePetsContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const findPet = async (id) => {
    setIsLoadingFindPet(true);

    try {
      const response = await axios.get(`${PETS_API_URL}/${id}`);
      console.log(response.data);
      // update the Auth Context
      await dispatch({ type: "DETAIL", payload: response.data });
      setIsLoadingFindPet(false);
    } catch (error) {
      await dispatch({ type: "DETAIL", payload: error.response.data });
      setIsLoadingFindPet(false);
    }
  };

  return { findPet, isLoadingFindPet };
};
