// React Lib
import { useEffect } from "react";

// Mui Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Button, Avatar, useTheme, Box, Typography } from "@mui/material";

// Mui Theme
import { tokens } from "../../theme";

const InfoPet = ({ open, close, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log(data);
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
            maxWidth: "700px", // Set your width here
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
        {"Pet Détails"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <Avatar
          src={data.photo}
          sx={{
            width: 120,
            height: 120,
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: "10px",
          }}
        />
        <Typography
          variant="h3"
          color={colors.grey[200]}
          sx={{ textAlign: "center" }}
        >
          {data.name}
        </Typography>
        <Box
          display="grid"
          gap="25px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
        >
          <Typography
            variant="h4"
            color={colors.grey[100]}
            sx={{ gridColumn: "span 6" }}
          >
            Informations Pet
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Propriétaire <br /> {data.client.full_name}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Date Naissance <br /> {data.date_de_naissance}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Couleur <br /> {data.couleur}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Type <br /> {data.type}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Race <br /> {data.race.name}
          </Typography>
          <Typography
            variant="h4"
            color={colors.grey[100]}
            sx={{ gridColumn: "span 6" }}
          >
            Informations Médicale
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Dernier vaccination <br /> {data.date_dernier_vaccin}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Dernier antiparasite <br /> {data.date_dernier_antiparasite}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Dernier vermifuge <br /> {data.date_dernier_vermifuge}
          </Typography>

          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Habitudes alimentaires <br /> {data.habitude_alimentaire}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Tempérament du pet <br /> {data.temperament_du_chat}
          </Typography>
          <Typography
            variant="h5"
            color={colors.grey[200]}
            sx={{ gridColumn: "span 2" }}
          >
            Problème de santé <br /> {data.probleme_de_sante}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.blueAccent[700] }}>
        <Button color="warning" variant="contained" onClick={close}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoPet;
