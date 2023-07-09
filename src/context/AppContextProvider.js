import { AuthContextProvider } from "./authContext";
import { UserContextProvider } from "./userContext";
import { ClientContextProvider } from "./clientContext";
import { PetsContextProvider } from "./petsContext";
import { VetContextProvider } from "./vetContext";
import { BoxContextProvider } from "./boxContext";
import { RaceContextProvider } from "./raceContext";
import { ServiceContextProvider } from "./serviceContext";
import { TarifContextProvider } from "./tarifContext";
import { AdoptionsContextProvider } from "./adoptionsContext";
import { DashContextProvider } from "./dashContext";
import { ReservationContextProvider } from "./reservationContext";
import { DemandeAdoptionContextProvider } from "./demandeAdoptionContext";

import { AppContextCombiner } from "./AppContextCombiner";

const providers = [
  AuthContextProvider,
  UserContextProvider,
  ClientContextProvider,
  PetsContextProvider,
  VetContextProvider,
  BoxContextProvider,
  RaceContextProvider,
  ServiceContextProvider,
  TarifContextProvider,
  AdoptionsContextProvider,
  DashContextProvider,
  ReservationContextProvider,
  DemandeAdoptionContextProvider,
];

export const AppContextProvider = AppContextCombiner(...providers);
