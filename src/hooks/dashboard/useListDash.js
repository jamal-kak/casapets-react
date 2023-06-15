import { useState } from "react";
import { useDashContext } from "./useDashContext";
import axios from "axios";
import {
  CLIENT_LIST,
  VET_LIST,
  PET_LIST,
  RESERVATION_LIST,
} from "../../utils/APIS";

export const useListDash = () => {
  const [isLoadingListDash, setIsLoadingListDash] = useState(null);
  const [errorListDash, setErrorListDash] = useState(null);
  const { dispatch } = useDashContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listDash = async (type) => {
    setIsLoadingListDash(true);

    try {
      /*const url =
        type === "client" ? CLIENT_LIST : type === "vet" ? VET_LIST : PET_LIST;
      const response = await axios.get(url);
      console.log(response.data.data);
      await dispatch({ type: "LIST", payload: response.data });*/

      if (type === "client") {
        const response = await axios.get(CLIENT_LIST);
        console.log(response.data.data);
        await dispatch({ type: "CLIENT", payload: response.data });
      } else if (type === "vet") {
        const response = await axios.get(VET_LIST);
        console.log(response.data.data);
        await dispatch({ type: "VET", payload: response.data });
      } else if (type === "pet") {
        const response = await axios.get(PET_LIST);
        console.log(response.data.data);
        await dispatch({ type: "PET", payload: response.data });
      } else {
        const response = await axios.get(RESERVATION_LIST);
        console.log(response.data.data);
        await dispatch({ type: "RESERVATION", payload: response.data });
      }

      setIsLoadingListDash(false);
    } catch (error) {
      setErrorListDash(error.response.data);
      setIsLoadingListDash(false);
    }
  };

  return { listDash, errorListDash, isLoadingListDash };
};
