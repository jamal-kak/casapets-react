// React Lib
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mui Library
import { useTheme, Box, Button, LinearProgress } from "@mui/material";
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
import { useVetContext } from "../../hooks/veterinaire/useVetContext";
import { useAddVet } from "../../hooks/veterinaire/useAddVet";
import { useFindVet } from "../../hooks/veterinaire/useFindVet";
import { useUpdateVet } from "../../hooks/veterinaire/useUpdateVet";

// Components
import { Header, InputText, ErrorMessage } from "../../components";

const FormVet = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const { id } = useParams();

  const { veterinaire } = useVetContext();
  const { addVet, isLoadingAddVet } = useAddVet();
  const { findVet, isLoadingFindVet } = useFindVet();
  const { updateVet, isLoadingUpdateVet } = useUpdateVet();

  useEffect(() => {
    if (id) {
      findVet(id);
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    reference: yup.string().required("Référence est Obligatoire"),
    full_name: yup.string().required("Nom est Obligatoire"),
    adresse: yup.string().required("Adresse est Obligatoire"),
    phone: yup.string().required("Téléphone est obligatoire").min(10).max(13),
    email: yup
      .string()
      .email("invalid email")
      .required("Email est Obligatoire"),
    city: yup.string().required("Ville est Obligatoire"),
  });
  const initialValues = {
    reference: data?.reference || `VET-${Date.now()}`,
    full_name: data?.full_name || "",
    adresse: data?.adresse || "",
    phone: data?.phone || "",
    email: data?.email || "",
    city: data?.city || "",
  };

  const handleFormSubmitVet = async (values) => {
    if (!data) {
      await addVet(values);
    } else {
      await updateVet(data.id, values);
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
        {!data ? "Ajouter Vétérinaire" : "Modifier Vétérinaire"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <>
          {(isLoadingAddVet || isLoadingUpdateVet) && (
            <LinearProgress color="secondary" />
          )}
          <Box m="20px">
            <Formik
              onSubmit={handleFormSubmitVet}
              initialValues={initialValues}
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
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 6",
                      },
                    }}
                  >
                    <InputText
                      title="Référence"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.reference}
                      name="reference"
                      error={!!touched.reference && !!errors.reference}
                      helperText={touched.reference && errors.reference}
                      disabled={true}
                      span={2}
                    />

                    <InputText
                      title="Nom du Vétérinaire"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.full_name}
                      name="full_name"
                      error={!!touched.full_name && !!errors.full_name}
                      helperText={touched.full_name && errors.full_name}
                      span={2}
                    />

                    <InputText
                      title="Adress du Vétérinaire"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.adresse}
                      name="adresse"
                      error={!!touched.adresse && !!errors.adresse}
                      helperText={touched.adresse && errors.adresse}
                      span={2}
                    />

                    <InputText
                      title="Numéro du Vétérinaire"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      span={2}
                    />

                    <InputText
                      title="E-mail du Vétérinaire"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      span={2}
                    />

                    <InputText
                      title="Ville"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                      span={2}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
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

export default FormVet;
