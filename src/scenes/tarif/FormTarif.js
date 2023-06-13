// React Lib
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mui Lib
import { Box, Button, LinearProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// Formik Lib
import { Formik } from "formik";
import * as yup from "yup";

// Context
import { useTarifContext } from "../../hooks/tarifs/useTarifContext";
import { useServiceContext } from "../../hooks/services/useServiceContext";
import { useAddTarif } from "../../hooks/tarifs/useAddTarif";
import { useFindTarif } from "../../hooks/tarifs/useFindTarif";
import { useUpdateTarif } from "../../hooks/tarifs/useUpdateTarif";
import { useListServices } from "../../hooks/services/useListServices";

// Components
import { Header, InputText, ErrorMessage, InputSelect } from "../../components";

const FormTarif = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { services } = useServiceContext();
  const { detailTarif } = useTarifContext();
  const { addTarif, isLoadingAddTarif } = useAddTarif();
  const { findTarif, isLoadingFindTarif } = useFindTarif();
  const { updateTarif, isLoadingUpdateTarif } = useUpdateTarif();
  const { listServices, isLoadingListServices } = useListServices();

  const navigate = useNavigate();
  const { id } = useParams();

  const handleList = async () => {
    await listServices(true);
  };

  useEffect(() => {
    handleList();
    if (id) {
      findTarif(id);
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    service_id: yup.string().required("Service est Obligatoire"),
    prix_brut: yup.number().required("Prix Brut est obligatoire"),
    prix_net: yup.number().required("Pric Net est Obligatoire"),
    remise: yup.number().notRequired(),
  });
  const initialValues = {
    service_id: detailTarif?.data?.service_id || "",
    prix_brut: detailTarif?.data?.prix_brut || "",
    prix_net: detailTarif?.data?.prix_net || "",
    remise: detailTarif?.data?.remise || "",
  };

  const handleFormSubmit = async (values) => {
    if (!id) {
      await addTarif(values);
    } else {
      await updateTarif(id, values);
    }
    navigate("/tarifs");
  };

  return (
    <>
      {isLoadingFindTarif || isLoadingListServices ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          {(isLoadingAddTarif || isLoadingUpdateTarif) && (
            <LinearProgress color="secondary" />
          )}
          {detailTarif?.message && (
            <ErrorMessage message={detailTarif?.message} />
          )}
          <Box m="20px">
            <Header
              title={id ? "MODIFIER TARIF" : "AJOUTER TARIF"}
              subtitle={id ? "Modifier un  Tarif" : "Ajouter un nouveau Tarif"}
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
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <InputSelect
                      title="Service"
                      name="service_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.service_id}
                      error={!!touched.service_id && !!errors.service_id}
                      span={2}
                      options={
                        services?.data.filter((item) => item.tarif === null) ||
                        []
                      }
                      optionName="title"
                    />

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
                        { id: 10, title: "10 %" },
                        { id: 20, title: "20 %" },
                        { id: 30, title: "30 %" },
                        { id: 40, title: "40 %" },
                        { id: 50, title: "50 %" },
                      ]}
                      optionName="title"
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

export default FormTarif;
