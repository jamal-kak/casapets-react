import { useState } from "react";
import { useBoxContext } from "./useBoxContext";
import axios from "axios";
import { BOX_API_URL } from "../../utils/APIS";

export const useDeleteBox = () => {
  const [isLoadingDeleteBox, setIsLoadingDeleteBox] = useState(null);
  const { dispatch } = useBoxContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteBox = async (id) => {
    setIsLoadingDeleteBox(true);

    try {
      const response = await axios.delete(`${BOX_API_URL}/${id}`);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteBox(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteBox(false);
    }
  };

  return { deleteBox, isLoadingDeleteBox };
};
