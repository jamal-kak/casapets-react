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
import { useRaceContext } from "../../hooks/races/useRaceContext";
import { useListRaces } from "../../hooks/races/useListRaces";
import { useAddAdoptions } from "../../hooks/adoptions/useAddAdoptions";
import { useUpdateAdoption } from "../../hooks/adoptions/useUpdateAdoption";

// Components
import { InputText, InputSelect } from "../../components";

// Static Data
import { couleurChat, couleurChien } from "../../Data/couleurPets";

// dayjs Lib
import dayjs from "dayjs";
import "dayjs/locale/en";

const FormAdoption = ({ open, close, data, setRequestSend }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { races } = useRaceContext();
  const { listRaces, isLoadingListRaces } = useListRaces();
  const { addAdoptions, isLoadingAddAdoptions } = useAddAdoptions();
  const { updateAdoption, isLoadingUpdateAdoption } = useUpdateAdoption();

  const handleList = async () => {
    await listRaces();
  };

  useEffect(() => {
    handleList();
  }, []);

  const checkoutSchema = yup.object().shape({
    profile: yup.string().required("Profile est Obligatoire"),
    name: yup.string().required("Nom est Obligatoire"),
    race_id: yup.number().required("Race est Obligatoire"),
    caractere: yup.string().required("Caractère est Obligatoire"),
    age: yup.string().required("Age est Obligatoire"),
    type: yup.string().required("Type est Obligatoire"),
  });
  const initialValues = {
    id: data?.id,
    profile: data?.profile || "",
    name: data?.name || "",
    date_de_naissance: data?.date_de_naissance || undefined,
    race_id: data?.race_id || "",
    caractere: data?.caractere || "",
    age: data?.age || "",
    type_de_poil: data?.type_de_poil || "",
    couleur_de_poil: data?.couleur_de_poil || "",
    compatible: data?.compatible || "",
    besoins: data?.besoins || "",
    description: data?.description || "",
    type: data?.type || "",
    prix: data?.prix || "",
    photo: undefined,
  };

  const handleFormSubmit = async (values) => {
    if (!data) {
      await addAdoptions(values);
    } else {
      await updateAdoption(data.id, values);
      console.log(values);
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
        {!data ? "Ajouter Pet à Adopter" : "Modifier Pet à Adopter"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {(isLoadingAddAdoptions ||
            isLoadingUpdateAdoption ||
            isLoadingListRaces) && <LinearProgress color="secondary" />}
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
                      Informations Adoptions
                    </Typography>

                    <InputSelect
                      title="Profile"
                      name="profile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.profile}
                      error={!!touched.profile && !!errors.profile}
                      options={[
                        { id: "association", title: "Association" },
                        { id: "particulier", title: "Particulier" },
                        { id: "éleveur", title: "Éleveur" },
                      ]}
                      optionName="title"
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
                      title="Type"
                      name="type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.type}
                      error={!!touched.type && !!errors.type}
                      options={[
                        { id: "chien", title: "Chien" },
                        { id: "chat", title: "Chat" },
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
                          (item) =>
                            item.type === (values.type === "chien" ? 1 : 2)
                        ) || []
                      }
                      optionName="name"
                    />

                    <InputSelect
                      title="Caractère"
                      name="caractere"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.caractere}
                      error={!!touched.caractere && !!errors.caractere}
                      options={[
                        { id: "calme", title: "Calme" },
                        { id: "moyen", title: "Moyen" },
                        { id: "actif", title: "Actif" },
                        { id: "non défini", title: "Non Défini" },
                      ]}
                      optionName="title"
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
                      title="Age"
                      name="age"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.age}
                      error={!!touched.age && !!errors.age}
                      options={[
                        { id: "chiot", title: "Chiot" },
                        { id: "jeune", title: "Jeune" },
                        { id: "adulte", title: "Adulte" },
                        { id: "senior", title: "Senior" },
                      ]}
                      optionName="title"
                    />

                    <InputSelect
                      title="Type de Poil"
                      name="type_de_poil"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.type_de_poil}
                      error={!!touched.type_de_poil && !!errors.type_de_poil}
                      options={[
                        { id: "court", title: "Court" },
                        { id: "moyen", title: "Moyen" },
                        { id: "long", title: "Long" },
                      ]}
                      optionName="title"
                    />

                    <InputSelect
                      title="Couleur"
                      name="couleur_de_poil"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.couleur_de_poil}
                      options={
                        values.type === "chien"
                          ? couleurChien
                          : values.type === "chat"
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
                      Autre Informations
                    </Typography>

                    <InputText
                      title="Compatible"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.compatible}
                      name="compatible"
                    />

                    <InputText
                      title="Besoins"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.besoins}
                      name="besoins"
                    />

                    <InputText
                      title="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      name="description"
                    />

                    <InputText
                      title="Prix"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.prix}
                      name="prix"
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

export default FormAdoption;
