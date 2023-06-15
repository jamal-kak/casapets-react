import { DashContext } from "../../context/dashContext";
import { useContext } from "react";

export const useDashContext = () => {
  const context = useContext(DashContext);

  if (!context) {
    throw Error("useDashContext must be used inside an DashContextProvider");
  }

  return context;
};
