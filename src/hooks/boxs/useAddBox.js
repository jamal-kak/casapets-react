import { useState } from "react";
import { useBoxContext } from "./useBoxContext";
import axios from "axios";
import { BOX_API_URL } from "../../utils/APIS";

export const useAddBox = () => {
  const [isLoadingAddBox, setIsLoadingAddBox] = useState(null);
  const { dispatch } = useBoxContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addBox = async (values) => {
    setIsLoadingAddBox(true);

    try {
      const response = await axios.post(BOX_API_URL, values);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddBox(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      setIsLoadingAddBox(false);
    }
  };

  return { addBox, isLoadingAddBox };
};
