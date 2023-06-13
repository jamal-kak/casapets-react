// React Lib
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mui Lib
import { Box, Button, TextField, LinearProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// Formik Lib
import { Formik } from "formik";
import * as yup from "yup";

// Context
import { useClientContext } from "../../hooks/clients/useClientContext";
import { useAddClient } from "../../hooks/clients/useAddClient";
import { useFindClient } from "../../hooks/clients/useFindClient";
import { useUpdateClient } from "../../hooks/clients/useUpdateClient";

// Components
import { Header, InputText, ErrorMessage } from "../../components";

const FormClient = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { client } = useClientContext();
  const { addClient, isLoading } = useAddClient();
  const { findClient, isLoadingFindClient } = useFindClient();
  const { updateClient, isLoadingUpdateClient } = useUpdateClient();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      findClient(id);
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    full_name: yup.string().required("Nom & Prénom est Obligatoire"),
    phone: yup.string().required("Téléphone est obligatoire").min(10).max(13),
    email: yup
      .string()
      .email("invalid email")
      .required("Email est Obligatoire"),
    adresse: yup.string().required("Adresse est Obligatoire"),
  });
  const initialValues = {
    full_name: client?.data?.full_name || "",
    email: client?.data?.email || "",
    phone: client?.data?.phone || "",
    adresse: client?.data?.adresse || "",
  };

  const handleFormSubmit = async (values) => {
    if (!id) {
      await addClient(values);
    } else {
      await updateClient(id, values);
    }
    navigate("/clients");
  };

  return (
    <>
      {isLoadingFindClient ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          {(isLoading || isLoadingUpdateClient) && (
            <LinearProgress color="secondary" />
          )}
          {client?.message && <ErrorMessage message={client?.message} />}
          <Box m="20px">
            <Header
              title={id ? "MODIFIER CLIENT" : "AJOUTER CLIENT"}
              subtitle={
                id ? "Modifier un nouveau Client" : "Ajouter un nouveau Client"
              }
            />

            <Formik
              onSubmit={handleFormSubmit}
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
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <InputText
                      title="Nom & Prénom"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.full_name}
                      name="full_name"
                      error={!!touched.full_name && !!errors.full_name}
                      helperText={touched.full_name && errors.full_name}
                      span={2}
                    />

                    <InputText
                      title="Téléphone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      span={2}
                    />

                    <InputText
                      title="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      span={2}
                    />

                    <InputText
                      title="Adresse"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.adresse}
                      name="adresse"
                      error={!!touched.adresse && !!errors.adresse}
                      helperText={touched.adresse && errors.adresse}
                      span={2}
                    />
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
      )}
    </>
  );
};

export default FormClient;
