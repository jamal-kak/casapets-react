// Mui Lib
import { Box, Button, LinearProgress, useTheme } from "@mui/material";
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
import { useAddClient } from "../../hooks/clients/useAddClient";
import { useUpdateClient } from "../../hooks/clients/useUpdateClient";

// Components
import { InputText } from "../../components";

// Mui Theme
import { tokens } from "../../theme";

const FormClient = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { addClient, isLoading } = useAddClient();
  const { updateClient, isLoadingUpdateClient } = useUpdateClient();

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
    full_name: data?.full_name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    adresse: data?.adresse || "",
  };

  const handleFormSubmit = async (values) => {
    if (!data) {
      await addClient(values);
    } else {
      await updateClient(data.id, values);
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
        {!data ? "Ajouter Client" : "Modifier Client"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <>
          {(isLoading || isLoadingUpdateClient) && (
            <LinearProgress color="secondary" />
          )}
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
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.blueAccent[700] }}>
        <Button color="warning" variant="contained" onClick={close}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormClient;
