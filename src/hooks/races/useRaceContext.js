import { RaceContext } from "../../context/raceContext";
import { useContext } from "react";

export const useRaceContext = () => {
  const context = useContext(RaceContext);

  if (!context) {
    throw Error("useRaceContext must be used inside an RaceContextProvider");
  }

  return context;
};
