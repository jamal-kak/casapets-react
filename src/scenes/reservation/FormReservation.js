// Mui Lib
import { Box, Button, LinearProgress, useTheme, Autocomplete, TextField } from "@mui/material";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import useMediaQuery from "@mui/material/useMediaQuery";

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
import { useAddReservation } from "../../hooks/reservations/useAddReservation";
import { useUpdateReservation } from "../../hooks/reservations/useUpdateReservation";

// Components
import { InputText, InputSelect } from "../../components";

// Mui Theme
import { tokens } from "../../theme";
import { useState } from "react";
import { formatDate } from "../../utils/Helpers";

const FormReservation = ({ open, close, data, setRequestSend, client, pet, veterinaire, boxs, services }) => {
  // const clients = client.data.map( elem =>{ return { id: elem.id, title: elem.full_name } })
  console.log("datadata",client, pet, veterinaire, boxs, services);

  // const selectedServices = data?.services || [];
  const statusOptions = [
    { id: 1, title: "Active" },
    { id: 2, title: "InActive" },
  ];

  const [date_rdv, setDate_rdv] = useState(null);


  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { addReservation, isLoadingAddReservation } = useAddReservation();
  const { updateReservation, isLoadingUpdateReservation } = useUpdateReservation();

  const checkoutSchema = yup.object().shape({
    reference: yup.string().required("Référence est Obligatoire"),
    client_id: yup.string().required("Le client est obligatoire"),
    pet_id: yup.string().required("Le pet est obligatoire"),
    veterinaire_id: yup.string().required("Le veterinaire est obligatoire"),
    services: yup
      .array()
      .of(
        yup.object().shape({
          service_id: yup.number().required("L'identifiant du service est obligatoire"),
        })
      )
      .required("Les services sont obligatoires"),
    status_key: yup.number().required("Status est obligatoire"),
    date: yup.date().required("La date RDV est obligatoire"),
  });
  
  const initialValues = {
    reference: data?.reference || `RES-${Date.now()}`,
    client_id: data?.client_id || "",
    pet_id: data?.pet_id || "",
    veterinaire_id: data?.veterinaire_id || "",
    services: data?.services || [],
    status_key: data?.status_key || "",
    date: data?.date_rdv ? new Date(data.date_rdv) : new Date(),
    box_id: data?.box_id || "",
  };


  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (event, value) => {
    setSelectedServices(value);
    // console.log("selectedServices",selectedServices);
  };
  
console.log(formatDate(date_rdv));
  const handleFormSubmit = async (values) => {

    const newValues = {
      ...values,
      "date_rdv" : date_rdv,
      services:selectedServices.map(service=>{ return {"service_id":service.id}})
    }
    console.log("newValues",newValues);

    if (!data) {
      await addReservation(newValues);
    } else {
      await updateReservation(data.id, newValues);
    }
    close();
    setRequestSend((prev) => !prev);
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ borderRadius: 28 }}
    >
      <DialogTitle
        id="alert-dialog-title"
        fontSize={20}
        sx={{ backgroundColor: colors.blueAccent[700] }}
      >
        {!data ? "Ajouter Reservation" : "Modifier Reservation"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <>
          {(isLoadingAddReservation || isLoadingUpdateReservation) && (
            <LinearProgress color="secondary" />
          )}
          <Box m="20px">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues} // Use the initial values here
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(9, minmax(0, 2fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 12",
                      },
                    }}
                  >
                    <InputText
                      title="Reference"
                      name="reference"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.reference}
                      error={!!touched.reference && !!errors.reference}
                      span={4}
                      disabled={data && data.reference}
                    />

                    

                    <InputSelect
                      title="Client"
                      name="client_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.client_id}
                      error={!!touched.client_id && !!errors.client_id}
                      span={4}
                      options={client && client.data ? client.data.map((elem) => {
                        return { id: elem.id, title: elem.full_name };
                      }) : []}
                      optionName="title"
                    />

                    <InputSelect
                      title="Pet"
                      name="pet_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pet_id}
                      error={!!touched.pet_id && !!errors.pet_id}
                      span={4}
                      options={pet && pet.data?pet.data.map((elem) => {
                        return { id: elem.id, title: elem.name };
                      }):[]}
                      optionName="title"
                    />

                    <InputSelect
                      title="Veterinaire"
                      name="veterinaire_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.veterinaire_id}
                      error={!!touched.veterinaire_id && !!errors.veterinaire_id}
                      span={4}
                      options={veterinaire && veterinaire.data?veterinaire.data.map((elem) => {
                        return { id: elem.id, title: elem.full_name };
                      }):[]}
                      optionName="title"
                    />
                    
                    {/* Services multi-select */}
                    <Box gridColumn="span 9">
                      <Autocomplete
                        multiple
                        options={services.data}
                        getOptionLabel={(option) => option.title}
                        value={selectedServices}
                        onChange={handleServiceChange}
                        onBlur={handleBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="service_id"
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
                      span={4}
                      options={boxs && boxs.data?boxs.data.map((elem) => ({ id: elem.id, title: elem.id })):[]}
                      optionName="title"
                    />

                    <InputSelect
                      title="Status"
                      name="status_key"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status_key}
                      error={!!touched.status_key && !!errors.status_key}
                      span={4}
                      options={statusOptions}                    
                      optionName="title"
                    />


                  </Box>


                  <Box display="flex" justifyContent="start" mt="20px">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker value={date_rdv} onChange={(newValue) => setDate_rdv(formatDate(newValue))} />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                  


                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="success" variant="contained">
                      Enregistrer
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.blueAccent[700] }}>
        <Button color="warning" variant="contained" onClick={close}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormReservation;
