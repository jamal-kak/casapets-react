import { useState } from "react";
import { useAdoptionsContext } from "./useAdoptionsContext";
import axios from "axios";
import { ADOPTIONS_LIST } from "../../utils/APIS";

export const useAddAdoptions = () => {
  const [isLoadingAddAdoptions, setIsLoadingAddAdoptions] = useState(null);
  const { dispatch } = useAdoptionsContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addAdoptions = async (values) => {
    setIsLoadingAddAdoptions(true);

    try {
      const response = await axios.post(ADOPTIONS_LIST, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddAdoptions(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      console.log(error.response.data);
      setIsLoadingAddAdoptions(false);
    }
  };

  return { addAdoptions, isLoadingAddAdoptions };
};
