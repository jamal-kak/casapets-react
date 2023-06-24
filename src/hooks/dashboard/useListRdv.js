import { useState } from "react";
import { useDashContext } from "./useDashContext";
import axios from "axios";
import { RDV_LIST } from "../../utils/APIS";

export const useListRdv = () => {
  const [isLoadingListRdv, setIsLoadingListRdv] = useState(null);
  const [errorListRdv, setErrorListRdv] = useState(null);
  const { dispatch } = useDashContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listRdv = async () => {
    setIsLoadingListRdv(true);

    try {
      const response = await axios.get(RDV_LIST);
      console.log(response.data.data);
      await dispatch({ type: "RDV", payload: response.data });

      setIsLoadingListRdv(false);
    } catch (error) {
      setErrorListRdv(error.response.data);
      setIsLoadingListRdv(false);
    }
  };

  return { listRdv, errorListRdv, isLoadingListRdv };
};
