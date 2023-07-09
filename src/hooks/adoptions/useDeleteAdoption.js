import { useState } from "react";
import { useAdoptionsContext } from "./useAdoptionsContext";
import axios from "axios";
import { ADOPTIONS_LIST } from "../../utils/APIS";

export const useDeleteAdoption = () => {
  const [isLoadingDeleteAdoption, setIsLoadingDeleteAdoption] = useState(null);
  const { dispatch } = useAdoptionsContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteAdoption = async (id) => {
    setIsLoadingDeleteAdoption(true);

    try {
      const response = await axios.delete(`${ADOPTIONS_LIST}/${id}`);
      console.log(response.data);
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteAdoption(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteAdoption(false);
    }
  };

  return { deleteAdoption, isLoadingDeleteAdoption };
};
