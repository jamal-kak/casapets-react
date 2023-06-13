import { useState } from "react";
import { useBoxContext } from "./useBoxContext";
import axios from "axios";
import { BOX_API_URL } from "../../utils/APIS";

export const useListBoxs = () => {
  const [isLoadingListBoxs, setIsLoadingListBoxs] = useState(null);
  const { dispatch } = useBoxContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listBoxs = async () => {
    setIsLoadingListBoxs(true);

    try {
      const response = await axios.get(BOX_API_URL);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingListBoxs(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListBoxs(false);
    }
  };

  return { listBoxs, isLoadingListBoxs };
};
