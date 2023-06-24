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
import { useRaceContext } from "../../hooks/races/useRaceContext";
import { useAddRace } from "../../hooks/races/useAddRace";
import { useUpdateRace } from "../../hooks/races/useUpdateRace";

// Components
import { InputText, ErrorMessage, InputSelect } from "../../components";

// Mui Theme
import { tokens } from "../../theme";

const FormRace = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { detailRace } = useRaceContext();
  const { addRace, isLoadingAddRace } = useAddRace();
  const { updateRace, isLoadingUpdateRace } = useUpdateRace();

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Race est obligatoire"),
    type: yup.number().required("Type est Obligatoire"),
  });
  const initialValues = {
    name: data?.name || "",
    type: data?.type || "",
  };

  const handleFormSubmit = async (values) => {
    if (!data) {
      await addRace(values);
    } else {
      await updateRace(data.id, values);
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
        {!data ? "Ajouter Race" : "Modifier Race"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <>
          {(isLoadingAddRace || isLoadingUpdateRace) && (
            <LinearProgress color="secondary" />
          )}
          {detailRace?.message && (
            <ErrorMessage message={detailRace?.message} />
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
                      title="Race"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
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

export default FormRace;
