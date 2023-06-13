// React Lib
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mui Library
import {
  useTheme,
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

// Formik Lib
import { Formik } from "formik";
import * as yup from "yup";

// Context
import { usePetsContext } from "../../hooks/pets/usePetsContext";
import { useClientContext } from "../../hooks/clients/useClientContext";
import { useAddPets } from "../../hooks/pets/useAddPets";
import { useListClient } from "../../hooks/clients/useListClient";
import { useFindPet } from "../../hooks/pets/useFindPet";
import { useUpdatePet } from "../../hooks/pets/useUpdatePet";

// Components
import { Header, InputText, InputSelect, ErrorMessage } from "../../components";

// Static Data
import { couleurChat, couleurChien } from "../../Data/couleurPets";

// dayjs Lib
import dayjs from "dayjs";
import "dayjs/locale/en";

const FormPet = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { client } = useClientContext();
  const { detailPet } = usePetsContext();
  const { listClient, isLoading } = useListClient();
  const { addPets, isLoadingAddPets } = useAddPets();
  const { findPet, isLoadingFindPet } = useFindPet();
  const { updatePet, isLoadingUpdatePet } = useUpdatePet();

  const navigate = useNavigate();
  const { id } = useParams();

  const handleList = async () => {
    await listClient();
  };

  useEffect(() => {
    handleList();
    if (id) {
      findPet(id);
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    reference: yup.string().required("Référence est Obligatoire"),
    name: yup.string().required("Nom est Obligatoire"),
    sexe_key: yup.number().required("Sexe est Obligatoire"),
    type_key: yup.number().required("Type est Obligatoire"),
    race_id: yup.number().required("Race est Obligatoire"),
    client_id: yup.number().required("Client est Obligatoire"),
  });
  const initialValues = {
    id: id,
    reference: detailPet?.data?.reference || `PET-${Date.now()}`,
    name: detailPet?.data?.name || "",
    date_de_naissance: detailPet?.data?.date_de_naissance || null,
    sexe_key: detailPet?.data?.sexe_key || "",
    type_key: detailPet?.data?.type_key || "",
    race_id: detailPet?.data?.race_id || "",
    client_id: detailPet?.data?.client_id || "",
    couleur: detailPet?.data?.couleur || "",
    vaccine: detailPet?.data?.vaccine || "",
    castre: detailPet?.data?.castre || "",
    date_dernier_antiparasite:
      detailPet?.data?.date_dernier_antiparasite || null,
    habitude_alimentaire: detailPet?.data?.habitude_alimentaire || "",
    temperament_du_chat: detailPet?.data?.temperament_du_chat || "",
    probleme_de_sante: detailPet?.data?.probleme_de_sante || "",
    remarque: detailPet?.data?.remarque || "",
    date_dernier_vaccin: detailPet?.data?.date_dernier_vaccin || null,
    date_dernier_vermifuge: detailPet?.data?.date_dernier_vermifuge || null,
    photo: undefined,
  };

  const handleFormSubmit = async (values) => {
    if (!id) {
      await addPets(values);
    } else {
      await updatePet(id, values);
      console.log(values);
    }

    navigate("/pets");
  };

  return (
    <>
      {isLoadingFindPet || isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          {(isLoadingAddPets || isLoadingUpdatePet) && (
            <LinearProgress color="secondary" />
          )}

          {detailPet?.message && <ErrorMessage message={detailPet?.message} />}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box m="20px">
              <Header
                title={id ? "MODIFIER PETS" : "AJOUTER PETS"}
                subtitle={id ? "Modifier ce Pet" : "Ajouter un nouveau Pet"}
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
                      <Typography
                        variant="h5"
                        color={colors.grey[300]}
                        sx={{ gridColumn: "span 4" }}
                      >
                        Informations Pet
                      </Typography>

                      <InputText
                        title="Référence"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.reference}
                        name="reference"
                        error={!!touched.reference && !!errors.reference}
                        helperText={touched.reference && errors.reference}
                        disabled={true}
                      />

                      <InputText
                        title="Nom du pet"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />

                      <InputSelect
                        title="Propriétaire"
                        name="client_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.client_id}
                        error={!!touched.client_id && !!errors.client_id}
                        options={client?.data || []}
                        optionName="full_name"
                      />

                      <DatePicker
                        slotProps={{
                          textField: {
                            size: "small",
                            variant: "filled",
                          },
                        }}
                        label="Date de Naissance"
                        value={dayjs(values.date_de_naissance)}
                        name="date_de_naissance"
                        format={"YYYY-MM-DD"}
                        onChange={(value) =>
                          setFieldValue(
                            "date_de_naissance",
                            value.format("YYYY-MM-DD")
                          )
                        }
                      />

                      <InputSelect
                        title="Type"
                        name="type_key"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.type_key}
                        error={!!touched.type_key && !!errors.type_key}
                        options={[
                          { id: 1, title: "Chien" },
                          { id: 2, title: "Chat" },
                        ]}
                        optionName="title"
                      />

                      <InputSelect
                        title="Sexe"
                        name="sexe_key"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.sexe_key}
                        error={!!touched.sexe_key && !!errors.sexe_key}
                        options={[
                          { id: 1, title: "Male" },
                          { id: 2, title: "Female" },
                        ]}
                        optionName="title"
                      />

                      <InputSelect
                        title="Race"
                        name="race_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.race_id}
                        error={!!touched.race_id && !!errors.race_id}
                        options={[
                          { id: 1, title: "Labrador Retriever" },
                          { id: 2, title: "Berger allemand" },
                        ]}
                        optionName="title"
                      />

                      <InputSelect
                        title="Couleur"
                        name="couleur"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.couleur}
                        options={
                          values.type_key === 1
                            ? couleurChien
                            : values.type_key === 2
                            ? couleurChat
                            : []
                        }
                        optionName="couleur"
                      />

                      <TextField
                        variant="filled"
                        size="small"
                        type="file"
                        name="photo"
                        value={undefined}
                        inputProps={{
                          accept: "image/*",
                        }}
                        onChange={(event) => {
                          setFieldValue("photo", event.currentTarget.files[0]);
                        }}
                      />

                      <Typography
                        variant="h5"
                        color={colors.grey[300]}
                        sx={{ gridColumn: "span 4" }}
                      >
                        Informations Médicale
                      </Typography>
                      <InputSelect
                        title="Vaccine"
                        name="vaccine"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.vaccine}
                        options={[
                          { id: "Oui", title: "Oui" },
                          { id: "Non", title: "Non" },
                        ]}
                        optionName="title"
                      />

                      <DatePicker
                        slotProps={{
                          textField: { size: "small", variant: "filled" },
                        }}
                        label="Date de dernier Vaccine"
                        value={dayjs(values.date_dernier_vaccin)}
                        name="date_dernier_vaccin"
                        format={"YYYY-MM-DD"}
                        onChange={(value) =>
                          setFieldValue(
                            "date_dernier_vaccin",
                            value.format("YYYY-MM-DD")
                          )
                        }
                      />

                      <InputSelect
                        title="Castre"
                        name="castre"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.castre}
                        options={[
                          { id: "Oui", title: "Oui" },
                          { id: "Non", title: "Non" },
                        ]}
                        optionName="title"
                      />
                      <DatePicker
                        slotProps={{
                          textField: { size: "small", variant: "filled" },
                        }}
                        label="Date de dernier Vermifuge"
                        value={dayjs(values.date_dernier_vermifuge)}
                        name="date_dernier_vermifuge"
                        format={"YYYY-MM-DD"}
                        onChange={(value) =>
                          setFieldValue(
                            "date_dernier_vermifuge",
                            value.format("YYYY-MM-DD")
                          )
                        }
                      />

                      <InputText
                        title="Habitude alimentaire"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.habitude_alimentaire}
                        name="habitude_alimentaire"
                      />

                      <InputText
                        title="Temperament du chat"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.temperament_du_chat}
                        name="temperament_du_chat"
                      />

                      <InputText
                        title="Probleme de Sante"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.probleme_de_sante}
                        name="probleme_de_sante"
                      />
                      <DatePicker
                        slotProps={{
                          textField: { size: "small", variant: "filled" },
                        }}
                        label="Date de dernier Antiparasite"
                        value={dayjs(values.date_dernier_antiparasite)}
                        name="date_dernier_antiparasite"
                        format={"YYYY-MM-DD"}
                        onChange={(value) =>
                          setFieldValue(
                            "date_dernier_antiparasite",
                            value.format("YYYY-MM-DD")
                          )
                        }
                      />
                      <InputText
                        title="Remarque"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.remarque}
                        name="remarque"
                      />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Enregistrer
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </LocalizationProvider>
        </>
      )}
    </>
  );
};

export default FormPet;
