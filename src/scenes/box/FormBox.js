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
import { useBoxContext } from "../../hooks/boxs/useBoxContext";
import { useAddBox } from "../../hooks/boxs/useAddBox";
import { useUpdateBox } from "../../hooks/boxs/useUpdateBox";

// Components
import { InputText, ErrorMessage, InputSelect } from "../../components";

// Mui Theme
import { tokens } from "../../theme";

const FormBox = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { detailBox } = useBoxContext();
  const { addBox, isLoadingAddBox } = useAddBox();
  const { updateBox, isLoadingUpdateBox } = useUpdateBox();

  const checkoutSchema = yup.object().shape({
    type: yup.number().required("Type est Obligatoire"),
    libelle: yup.string().required("Libelle est obligatoire"),
  });
  const initialValues = {
    type: data?.type || "",
    libelle: data?.libelle || "",
  };

  const handleFormSubmit = async (values) => {
    if (!data) {
      await addBox(values);
    } else {
      await updateBox(data.id, values);
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
        {!data ? "Ajouter Box" : "Modifier Box"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <>
          {(isLoadingAddBox || isLoadingUpdateBox) && (
            <LinearProgress color="secondary" />
          )}
          {detailBox?.message && <ErrorMessage message={detailBox?.message} />}
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
                      title="Libelle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.libelle}
                      name="libelle"
                      error={!!touched.libelle && !!errors.libelle}
                      helperText={touched.libelle && errors.libelle}
                      span={2}
                    />

                    <InputSelect
                      title="Type"
                      name="type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.type}
                      error={!!touched.type && !!errors.type}
                      span={2}
                      options={[
                        { id: 1, title: "Chien" },
                        { id: 2, title: "Chat" },
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

export default FormBox;
