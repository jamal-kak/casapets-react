export const BASE_API_URL = "http://localhost:8000/api/";

export const BASE_API_URL_LIST = "http://localhost:8000/api/list/";

// Data
export const USER_API_URL_LIST = BASE_API_URL_LIST + "users";
export const LOGIN_API_URL = BASE_API_URL + "login";
export const REGISTER_API_URL = BASE_API_URL + "register";
export const LOGOUT_API_URL = BASE_API_URL + "logout";

export const VET_API_URL = BASE_API_URL + "veterinaires";
export const VET_USER_API_URL = BASE_API_URL + "create";
export const CLIENT_API_URL = BASE_API_URL + "clients";
export const PETS_API_URL = BASE_API_URL + "pets";

// Résérvation
export const BOX_API_URL = BASE_API_URL + "boxs";
export const SELECT_BOX = BASE_API_URL_LIST + "boxs";
export const SERVICE_API_URL = BASE_API_URL + "services";
export const SERVICE_API_URL_LIST = BASE_API_URL_LIST + "services";
export const RACES_API_URL = BASE_API_URL + "races";
export const TARIFS_API_URL = BASE_API_URL + "tarifs";
export const STATUS_RES_API_URL = BASE_API_URL + "change-status";

// Adoption
export const ADOPTIONS_LIST = BASE_API_URL + "adoptions";

// Demande Adoption
export const DEMANDES_ADOPTION = BASE_API_URL + "demandeAdoptions";
export const CHANGE_STATUS = BASE_API_URL + "change-demande-adoptions";

// Dashboard
export const CLIENT_LIST = BASE_API_URL_LIST + "clients";
export const VET_LIST = BASE_API_URL_LIST + "veterinaires";
export const PET_LIST = BASE_API_URL_LIST + "pets";
export const RESERVATION_LIST = BASE_API_URL + "reservations";
export const RESERVATION_API_URL_LIST = BASE_API_URL_LIST + "reservations";
export const FACTURE_LIST = BASE_API_URL + "factures";
export const RDV_LIST = BASE_API_URL + "reservations";
export const DOWNLOAD = BASE_API_URL + "download";
