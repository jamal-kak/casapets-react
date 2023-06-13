// React Lib
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui Lib
import { Box, Button, LinearProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// Formik Lib
import { Formik } from "formik";
import * as yup from "yup";

// Components
import { Header, InputSelect, InputText, ErrorMessage } from "../../components";

// Context
import { useAddUser } from "../../hooks/users/useAddUser";

const FormUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { addUser, error, isLoading } = useAddUser();
  const navigate = useNavigate();

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Nom & Prénom Obligatoire"),
    role_id: yup.number().required("Role Obligatoire"),
    email: yup.string().email("invalid email").required("Email Obligatoire"),
    password: yup.string().required("Password Obligatoire").min(6),
  });

  const initialValues = {
    name: "",
    role_id: "",
    email: "",
    password: "",
    reference: `VET-${Date.now()}`,
    adresse: "",
    phone: "",
    city: "",
  };

  const handleFormSubmit = async (values) => {
    if (values.role_id !== 2) {
      const { name, role_id, email, password } = values;
      await addUser({ name, role_id, email, password });
    } else {
      await addUser(values);
    }

    console.log(values);
    navigate("/users");
  };

  return (
    <>
      {isLoading && <LinearProgress color="secondary" />}
      <Box m="20px">
        <Header
          title="Ajouter Utilisateur"
          subtitle="Ajouter un nouveau utilisateur"
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
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <InputText
                  title="Nom & Prénom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  span={2}
                />

                <InputSelect
                  title="Role"
                  name="role_id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role_id}
                  error={!!touched.role_id && !!errors.role_id}
                  span={2}
                  options={[
                    { id: 1, title: "Admin" },
                    { id: 2, title: "Vétérinaire" },
                    { id: 3, title: "Receptionniste" },
                  ]}
                  optionName="title"
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
                  title="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  type="password"
                  span={2}
                />

                {values.role_id === 2 && (
                  <>
                    <InputText
                      title="Référence"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.reference}
                      name="reference"
                      error={!!touched.reference && !!errors.reference}
                      helperText={touched.reference && errors.reference}
                      span={2}
                      disabled={true}
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

                    <InputText
                      title="Numéro"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      span={2}
                    />

                    <InputText
                      title="Ville"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      error={!!touched.phone && !!errors.city}
                      helperText={touched.city && errors.city}
                      span={2}
                    />
                  </>
                )}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New User
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default FormUser;
