// React Lib
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { useServiceContext } from "../../hooks/services/useServiceContext";
import { useAddTarif } from "../../hooks/tarifs/useAddTarif";
import { useUpdateTarif } from "../../hooks/tarifs/useUpdateTarif";
import { useListServices } from "../../hooks/services/useListServices";

// Components
import { InputText, InputSelect } from "../../components";

// Mui Theme
import { tokens } from "../../theme";

const FormTarif = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { services } = useServiceContext();
  const { addTarif, isLoadingAddTarif } = useAddTarif();
  const { updateTarif, isLoadingUpdateTarif } = useUpdateTarif();
  const { listServices, isLoadingListServices } = useListServices();

  const handleList = async () => {
    await listServices(true);
  };

  useEffect(() => {
    handleList();
  }, []);

  const checkoutSchema = yup.object().shape({
    service_id: yup.string().required("Service est Obligatoire"),
    prix_brut: yup.number().required("Prix Brut est obligatoire"),
    prix_net: yup.number().required("Pric Net est Obligatoire"),
    remise: yup.number(),
  });
  const initialValues = {
    service_id: data?.service_id || "",
    prix_brut: data?.prix_brut || "",
    prix_net: data?.prix_net || "",
    remise: data?.remise || 0,
  };

  const handleFormSubmit = async (values) => {
    if (!data) {
      await addTarif(values);
    } else {
      await updateTarif(data.id, values);
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
        {!data ? "Ajouter Tarif" : "Modifier Tarif"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <>
          {(isLoadingAddTarif ||
            isLoadingUpdateTarif ||
            isLoadingListServices) && <LinearProgress color="secondary" />}
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
                    {data ? (
                      <InputSelect
                        title="Service"
                        name="service_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.service_id}
                        error={!!touched.service_id && !!errors.service_id}
                        span={2}
                        options={services?.data || []}
                        optionName="title"
                      />
                    ) : (
                      <InputSelect
                        title="Service"
                        name="service_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.service_id}
                        error={!!touched.service_id && !!errors.service_id}
                        span={2}
                        options={
                          services?.data.filter(
                            (item) => item.tarif === null
                          ) || []
                        }
                        optionName="title"
                      />
                    )}

                    <InputText
                      title="Prix Brut"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue("prix_brut", e.target.value);
                        setFieldValue(
                          "prix_net",
                          parseInt(e.target.value) +
                            parseInt(e.target.value) * 0.2
                        );
                      }}
                      value={values.prix_brut}
                      name="prix_brut"
                      error={!!touched.prix_brut && !!errors.prix_brut}
                      helperText={touched.prix_brut && errors.prix_brut}
                      span={2}
                    />

                    <InputText
                      title="Prix Net"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.prix_net}
                      name="prix_net"
                      error={!!touched.prix_net && !!errors.prix_net}
                      helperText={touched.prix_net && errors.prix_net}
                      disabled={true}
                      span={2}
                    />

                    <InputSelect
                      title="Remise"
                      name="remise"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.remise}
                      error={!!touched.remise && !!errors.remise}
                      span={2}
                      options={[
                        { id: 0, title: "" },
                        { id: 10, title: "10 %" },
                        { id: 20, title: "20 %" },
                        { id: 30, title: "30 %" },
                        { id: 40, title: "40 %" },
                        { id: 50, title: "50 %" },
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

export default FormTarif;
