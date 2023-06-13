import { ServiceContext } from "../../context/serviceContext";
import { useContext } from "react";

export const useServiceContext = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw Error(
      "useServiceContext must be used inside an ServiceContextProvider"
    );
  }

  return context;
};
