// React Lib
import { useEffect, useState } from "react";

// Mui Library
import {
  useTheme,
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

// Mui Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Formik Lib
import { Formik } from "formik";
import * as yup from "yup";

// Context
import { useClientContext } from "../../hooks/clients/useClientContext";
import { useBoxContext } from "../../hooks/boxs/useBoxContext";
import { usePetsContext } from "../../hooks/pets/usePetsContext";
import { useVetContext } from "../../hooks/veterinaire/useVetContext";
import { useServiceContext } from "../../hooks/services/useServiceContext";
import { useAddReservation } from "../../hooks/reservations/useAddReservation";
import { useUpdateReservation } from "../../hooks/reservations/useUpdateReservation";
import { useListClient } from "../../hooks/clients/useListClient";
import { useListBoxs } from "../../hooks/boxs/useListBoxs";
import { useListPets } from "../../hooks/pets/useListPets";
import { useListVet } from "../../hooks/veterinaire/useListVet";
import { useListServices } from "../../hooks/services/useListServices";

// Components
import { Header, InputText, InputSelect, ErrorMessage } from "../../components";

// dayjs Lib
import dayjs from "dayjs";
import "dayjs/locale/en";

const FormReservation = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { client } = useClientContext();
  const { boxs } = useBoxContext();
  const { pet } = usePetsContext();
  const { veterinaire } = useVetContext();
  const { services } = useServiceContext();

  const { listClient, isLoading } = useListClient();
  const { listBoxs, isLoadingListBoxs } = useListBoxs();
  const { listPets, isLoadingListPets } = useListPets();
  const { listServices, isLoadingListServices } = useListServices();
  const { listVet, errorListVet, isLoadingListVet } = useListVet();

  const { addReservation, isLoadingAddReservation } = useAddReservation();
  const { updateReservation, isLoadingUpdateReservation } =
    useUpdateReservation();

  const [selectedServices, setSelectedServices] = useState([]);

  const handleList = async () => {
    await listClient();
    await listBoxs(data ? "all" : "minimal");
    await listPets();
    await listVet();
    await listServices();
  };

  useEffect(() => {
    handleList();
    if (data) {
      setSelectedServices(
        data?.detail_reservation?.map((elem) => {
          return elem.service;
        }) || []
      );
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    reference: yup.string().required("Référence est Obligatoire"),
    client_id: yup.number().required("Le client est obligatoire"),
    pet_id: yup.number().required("Le pet est obligatoire"),
    veterinaire_id: yup.number().required("Le veterinaire est obligatoire"),
    services: yup
      .array()
      .of(
        yup.object().shape({
          service_id: yup
            .number()
            .required("L'identifiant du service est obligatoire"),
        })
      )
      .required("Les services sont obligatoires"),
    date_rdv: yup.string().required("La date RDV est obligatoire"),
  });
  const initialValues = {
    reference: data?.reference || `RES-${Date.now()}`,
    client_id: data?.client_id || "",
    pet_id: data?.pet_id || "",
    veterinaire_id: data?.veterinaire_id || "",
    services: [],
    date_rdv: data?.date_rdv || undefined,
    box_id: data?.box_id || "",
  };

  const handleServiceChange = (event, value) => {
    setSelectedServices(value);
    console.log("selectedServices", value);
  };

  const handleFormSubmit = async (values) => {
    const newValues = {
      ...values,
      services: selectedServices.map((service) => {
        return { service_id: service.id };
      }),
    };
    console.log(newValues);
    if (!data) {
      await addReservation(newValues);
    } else {
      await updateReservation(data.id, newValues);
    }

    setSelectedServices([]);
    close();
    setRequestSend((prev) => !prev);
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "900px", // Set your width here
          },
        },
        borderRadius: 28,
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        fontSize={20}
        sx={{ backgroundColor: colors.blueAccent[700] }}
      >
        {!data ? "Ajouter une Résérvation" : "Modifier Résérvation"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {(isLoadingAddReservation ||
            isLoadingUpdateReservation ||
            isLoading ||
            isLoadingListBoxs ||
            isLoadingListPets ||
            isLoadingListServices ||
            isLoadingListVet) && <LinearProgress color="secondary" />}
          <Box m="20px">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <InputText
                      title="Référence"
                      name="reference"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.reference}
                      error={!!touched.reference && !!errors.reference}
                      disabled={true}
                    />

                    <InputSelect
                      title="Client"
                      name="client_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.client_id}
                      error={!!touched.client_id && !!errors.client_id}
                      options={client?.data || []}
                      optionName="full_name"
                    />

                    <InputSelect
                      title="Pet"
                      name="pet_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pet_id}
                      error={!!touched.pet_id && !!errors.pet_id}
                      options={
                        pet?.data.filter(
                          (pet) => pet.client_id === values.client_id
                        ) || []
                      }
                      optionName="name"
                    />

                    <InputSelect
                      title="Vétérinaire"
                      name="veterinaire_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.veterinaire_id}
                      error={
                        !!touched.veterinaire_id && !!errors.veterinaire_id
                      }
                      options={veterinaire?.data || []}
                      optionName="full_name"
                    />

                    {/* Services multi-select */}
                    <Box gridColumn="span 4">
                      <Autocomplete
                        multiple
                        options={services?.data || []}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        value={selectedServices}
                        onChange={handleServiceChange}
                        onBlur={handleBlur}
                        name="services"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Services"
                            variant="outlined"
                            sx={{ width: "100%" }}
                          />
                        )}
                      />
                    </Box>

                    <InputSelect
                      title="Box"
                      name="box_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.box_id}
                      error={!!touched.box_id && !!errors.box_id}
                      span={2}
                      options={
                        boxs?.data
                          ? boxs?.data.map((elem) => ({
                              id: elem.id,
                              title: elem.id,
                            }))
                          : []
                      }
                      optionName="title"
                    />

                    <DatePicker
                      sx={{ gridColumn: "span 2" }}
                      slotProps={{
                        textField: {
                          size: "small",
                          variant: "filled",
                        },
                      }}
                      label="Date de Rendez-vous"
                      value={dayjs(values.date_rdv)}
                      name="date_rdv"
                      format={"YYYY-MM-DD"}
                      onChange={(value) =>
                        setFieldValue("date_rdv", value.format("YYYY-MM-DD"))
                      }
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <DialogActions>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Enregistrer
                      </Button>
                      <Button
                        color="warning"
                        variant="contained"
                        onClick={close}
                      >
                        Annuler
                      </Button>
                    </DialogActions>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FormReservation;
