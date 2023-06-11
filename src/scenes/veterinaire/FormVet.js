// React Lib
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mui Library
import { useTheme, Box, Button, LinearProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

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

const FormVet = () => {
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
    reference: veterinaire?.data?.reference || `VET-${Date.now()}`,
    full_name: veterinaire?.data?.full_name || "",
    adresse: veterinaire?.data?.adresse || "",
    phone: veterinaire?.data?.phone || "",
    email: veterinaire?.data?.email || "",
    city: veterinaire?.data?.city || "",
  };

  const handleFormSubmitVet = async (values) => {
    if (!id) {
      await addVet(values);
    } else {
      await updateVet(id, values);
    }

    navigate("/vet");
  };

  return (
    <>
      {isLoadingFindVet ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          {(isLoadingAddVet || isLoadingUpdateVet) && (
            <LinearProgress color="secondary" />
          )}

          {veterinaire?.message && (
            <ErrorMessage message={veterinaire?.message} />
          )}

          <Box m="20px">
            <Header
              title={id ? "MODIFIER VÉTÉRINAIRE" : "AJOUTER VÉTÉRINAIRE"}
              subtitle={
                id
                  ? "Modifier ce vétérinaire"
                  : "Ajouter un nouveau vétérinaire"
              }
            />

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
                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
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
      )}
    </>
  );
};

export default FormVet;
