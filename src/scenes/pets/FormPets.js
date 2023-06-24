// React Lib
import { useEffect } from "react";

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
import { useClientContext } from "../../hooks/clients/useClientContext";
import { useRaceContext } from "../../hooks/races/useRaceContext";
import { useListRaces } from "../../hooks/races/useListRaces";
import { useAddPets } from "../../hooks/pets/useAddPets";
import { useListClient } from "../../hooks/clients/useListClient";
import { useUpdatePet } from "../../hooks/pets/useUpdatePet";

// Components
import { Header, InputText, InputSelect, ErrorMessage } from "../../components";

// Static Data
import { couleurChat, couleurChien } from "../../Data/couleurPets";

// dayjs Lib
import dayjs from "dayjs";
import "dayjs/locale/en";

const FormPet = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { client } = useClientContext();
  const { races } = useRaceContext();
  const { listRaces, isLoadingListRaces } = useListRaces();
  const { listClient, isLoading } = useListClient();
  const { addPets, isLoadingAddPets } = useAddPets();
  const { updatePet, isLoadingUpdatePet } = useUpdatePet();

  const handleList = async () => {
    await listClient();
    await listRaces();
  };

  useEffect(() => {
    handleList();
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
    id: data?.id,
    reference: data?.reference || `PET-${Date.now()}`,
    name: data?.name || "",
    date_de_naissance: data?.date_de_naissance || undefined,
    sexe_key: data?.sexe_key || "",
    type_key: data?.type_key || "",
    race_id: data?.race_id || "",
    client_id: data?.client_id || "",
    couleur: data?.couleur || "",
    vaccine: data?.vaccine || "",
    castre: data?.castre || "",
    date_dernier_antiparasite: data?.date_dernier_antiparasite || undefined,
    habitude_alimentaire: data?.habitude_alimentaire || "",
    temperament_du_chat: data?.temperament_du_chat || "",
    probleme_de_sante: data?.probleme_de_sante || "",
    remarque: data?.remarque || "",
    date_dernier_vaccin: data?.date_dernier_vaccin || undefined,
    date_dernier_vermifuge: data?.date_dernier_vermifuge || undefined,
    photo: undefined,
  };

  const handleFormSubmit = async (values) => {
    if (!data) {
      await addPets(values);
    } else {
      await updatePet(data.id, values);
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
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "900px", // Set your width here
          },
        },
        borderRadius: 28,
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        fontSize={20}
        sx={{ backgroundColor: colors.blueAccent[700] }}
      >
        {!data ? "Ajouter Pet" : "Modifier Pet"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {(isLoadingAddPets || isLoadingUpdatePet || isLoading) && (
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
                      options={
                        races?.data.filter(
                          (item) => item.type === values.type_key
                        ) || []
                      }
                      optionName="name"
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
                    <DialogActions>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
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
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FormPet;
