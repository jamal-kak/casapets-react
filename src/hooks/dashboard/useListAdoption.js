import { useState } from "react";
import { useDashContext } from "./useDashContext";
import axios from "axios";
import { ADOPTIONS_LIST } from "../../utils/APIS";

export const useListAdoption = () => {
  const [isLoadingListAdoption, setIsLoadingListAdoption] = useState(null);
  const [errorListAdoption, setErrorListAdoption] = useState(null);
  const { dispatch } = useDashContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listAdoption = async () => {
    setIsLoadingListAdoption(true);

    try {
      const response = await axios.get(ADOPTIONS_LIST);
      console.log(response.data.data);
      await dispatch({ type: "ADOPTION", payload: response.data });

      setIsLoadingListAdoption(false);
    } catch (error) {
      setErrorListAdoption(error.response.data);
      setIsLoadingListAdoption(false);
    }
  };

  return { listAdoption, errorListAdoption, isLoadingListAdoption };
};
