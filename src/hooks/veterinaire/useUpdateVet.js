import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";
import { VET_API_URL } from "../../utils/APIS";

export const useUpdateVet = () => {
  const [isLoadingUpdateVet, setIsLoadingUpdateVet] = useState(null);
  const { dispatch } = useVetContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateVet = async (id, values) => {
    setIsLoadingUpdateVet(true);

    try {
      const response = await axios.patch(`${VET_API_URL}/${id}`, values);
      console.log(response.data);
      // update the Vet Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateVet(false);
    } catch (error) {
      setIsLoadingUpdateVet(false);
      console.log(error.response.data);
      await dispatch({ type: "MODIFIER", payload: error.response.data });
    }
  };

  return { updateVet, isLoadingUpdateVet };
};
