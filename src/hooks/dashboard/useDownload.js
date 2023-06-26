import { useState } from "react";
import axios from "axios";
import { DOWNLOAD } from "../../utils/APIS";

export const useDownload = () => {
  const [isLoadingDownload, setIsLoadingDownload] = useState(null);
  const [errorDownload, setErrorDownload] = useState(null);
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const download = async (id, type) => {
    setIsLoadingDownload(true);

    try {
      const response = await axios.post(`${DOWNLOAD}/${id}/${type}`, {
        responseType: "stream",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
      console.log(response);

      setIsLoadingDownload(false);
    } catch (error) {
      setErrorDownload(error);
      console.log(error);
      setIsLoadingDownload(false);
    }
  };

  return { download, errorDownload, isLoadingDownload };
};
