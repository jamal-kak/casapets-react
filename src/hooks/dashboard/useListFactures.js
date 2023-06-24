import { useState } from "react";
import { useDashContext } from "./useDashContext";
import axios from "axios";
import { FACTURE_LIST } from "../../utils/APIS";

export const useListFactures = () => {
  const [isLoadingListFacture, setIsLoadingListFacture] = useState(null);
  const [errorListFacture, setErrorListFacture] = useState(null);
  const { dispatch } = useDashContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listFacture = async () => {
    setIsLoadingListFacture(true);

    try {
      const response = await axios.get(FACTURE_LIST);
      console.log(response.data.data);
      const monthlyTotals = {};

      // Initialize monthly totals with 0 for all months
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      await months.forEach((month) => {
        const monthName = new Date(2000, month - 1, 1).toLocaleString(
          "default",
          {
            month: "long",
          }
        );
        monthlyTotals[monthName] = 0;
      });

      // Calculate monthly totals
      await response.data.data.forEach((invoice) => {
        const month = new Date(invoice?.created_at).getMonth();
        const monthName = new Date(2000, month, 1).toLocaleString("default", {
          month: "long",
        });
        monthlyTotals[monthName] += invoice?.total;
      });

      const chartData = await Object.entries(monthlyTotals).map(
        ([month, total]) => ({
          x: month,
          y: total,
        })
      );
      await dispatch({ type: "FACTURE", payload: chartData });

      setIsLoadingListFacture(false);
    } catch (error) {
      setErrorListFacture(error.response.data);
      setIsLoadingListFacture(false);
    }
  };

  return { listFacture, errorListFacture, isLoadingListFacture };
};
