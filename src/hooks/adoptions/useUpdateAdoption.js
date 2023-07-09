import { useState } from "react";
import { useAdoptionsContext } from "./useAdoptionsContext";
import axios from "axios";
import { ADOPTIONS_LIST } from "../../utils/APIS";

export const useUpdateAdoption = () => {
  const [isLoadingUpdateAdoption, setIsLoadingUpdateAdoption] = useState(null);
  const { dispatch } = useAdoptionsContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateAdoption = async (id, values) => {
    setIsLoadingUpdateAdoption(true);

    try {
      const response = await axios.post(ADOPTIONS_LIST, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateAdoption(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      console.log(error.response.data);
      setIsLoadingUpdateAdoption(false);
    }
  };

  return { updateAdoption, isLoadingUpdateAdoption };
};
