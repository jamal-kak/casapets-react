import { useState } from "react";
import { useBoxContext } from "./useBoxContext";
import axios from "axios";
import { BOX_API_URL } from "../../utils/APIS";

export const useFindBox = () => {
  const [isLoadingFindBox, setIsLoadingFindBox] = useState(null);
  const { dispatch } = useBoxContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const findBox = async (id) => {
    setIsLoadingFindBox(true);

    try {
      const response = await axios.get(`${BOX_API_URL}/${id}`);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "DETAIL", payload: response.data });
      setIsLoadingFindBox(false);
    } catch (error) {
      await dispatch({ type: "DETAIL", payload: error.response.data });
      setIsLoadingFindBox(false);
    }
  };

  return { findBox, isLoadingFindBox };
};
