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
import { useAddService } from "../../hooks/services/useAddService";
import { useUpdateService } from "../../hooks/services/useUpdateService";

// Components
import { InputText, InputSelect } from "../../components";

// Mui Theme
import { tokens } from "../../theme";

const FormService = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { addService, isLoadingAddService } = useAddService();
  const { updateService, isLoadingUpdateService } = useUpdateService();

  const checkoutSchema = yup.object().shape({
    reference: yup.string().required("Référence est Obligatoire"),
    title: yup.string().required("Titlre est obligatoire"),
    type_key: yup.number().required("Type est Obligatoire"),
    status_key: yup.number().required("Status est obligatoire"),
  });
  const initialValues = {
    reference: data?.reference || `SRV-${Date.now()}`,
    title: data?.title || "",
    type_key: data?.type_key || "",
    status_key: data?.status_key || "",
  };

  const handleFormSubmit = async (values) => {
    if (!data) {
      await addService(values);
    } else {
      await updateService(data.id, values);
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
        {!data ? "Ajouter Service" : "Modifier Service"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <>
          {(isLoadingAddService || isLoadingUpdateService) && (
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
                      title="Titre"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                      name="title"
                      error={!!touched.title && !!errors.title}
                      helperText={touched.title && errors.title}
                      span={2}
                    />

                    <InputSelect
                      title="Type"
                      name="type_key"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.type_key}
                      error={!!touched.type_key && !!errors.type_key}
                      span={2}
                      options={[
                        { id: 1, title: "Chat / Chien" },
                        { id: 2, title: "Chien" },
                        { id: 3, title: "Chat" },
                      ]}
                      optionName="title"
                    />

                    <InputSelect
                      title="Status"
                      name="status_key"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status_key}
                      error={!!touched.status_key && !!errors.status_key}
                      span={2}
                      options={[
                        { id: 1, title: "Active" },
                        { id: 2, title: "InActive" },
                      ]}
                      optionName="title"
                    />
                  </Box>
                  <Box display="flex" justifyContent="start" mt="20px">
                    <DialogActions>
                      <Button type="submit" color="success" variant="contained">
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
        </>
      </DialogContent>
    </Dialog>
  );
};

export default FormService;
