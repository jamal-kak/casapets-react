// React Lib
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui Library
import {
  Box,
  Button,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Mui Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

// Mui Theme
import { tokens } from "../../theme";

// Components
import { Header, ErrorMessage, SuccessMessage } from "../../components";

// Context
import { useVetContext } from "../../hooks/veterinaire/useVetContext";
import { useListVet } from "../../hooks/veterinaire/useListVet";
import { useSetAsUser } from "../../hooks/veterinaire/useSetAsUser";
import { useDeleteVet } from "../../hooks/veterinaire/useDeleteVet";

// Scenes
import FormVet from "./FormVet";

const Vets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { listVet, errorListVet, isLoadingListVet } = useListVet();
  const { setAsUser, isLoadingSetAsUser } = useSetAsUser();
  const { deleteVet, isLoadingDeleteVet } = useDeleteVet();
  const {
    veterinaire,
    updatedVeterinaire,
    NewVeterinaire,
    deletedVeterinaire,
  } = useVetContext();
  const [requestSend, setRequestSend] = useState(false);
  const [statusVet, setStatusVet] = useState({});

  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openVetForm, setOpenVetForm] = useState(false);
  const [dataVet, setDataVet] = useState({});

  const handleList = async () => {
    await listVet();
  };

  const handleClickOpen = (data = null) => {
    setDataVet(data);
    setOpenVetForm(true);
  };

  const handleClose = () => {
    setOpenVetForm(false);
  };

  const handleSetUser = async (id) => {
    await setAsUser(id);
    setRequestSend((prev) => !prev);
  };

  const handleDelete = async (id) => {
    await deleteVet(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusVet(NewVeterinaire || updatedVeterinaire || deletedVeterinaire);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },

    {
      field: "reference",
      headerName: "Référence",
      width: 120,
    },
    {
      field: "full_name",
      headerName: "Nom & Prénom",
      width: 100,
    },
    {
      field: "adresse",
      headerName: "Adresse",
      width: 330,
    },
    {
      field: "email",
      headerName: "E-MAIL",
      width: 170,
    },
    {
      field: "phone",
      headerName: "TELEPHONE",
      width: 100,
    },
    {
      field: "city",
      headerName: "VILLE",
      width: 100,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 270,
      renderCell: ({ row, row: { id } }) => {
        return (
          <Box
            width="100%"
            p="5px"
            display="flex"
            justifyContent="left"
            gap={1}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="info"
              width="10px"
            >
              <VisibilityIcon color={colors.blueAccent[100]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="success"
              width="10px"
              onClick={() => handleClickOpen(row)}
            >
              <EditIcon color={colors.greenAccent[200]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="warning"
              onClick={() => handleDelete(id)}
            >
              <DeleteIcon color={colors.redAccent[200]} />
            </Button>
          </Box>
        );
      },
    },
    {
      field: "setUser",
      headerName: "UTILISATEUR",
      width: 100,
      renderCell: ({ row: { user_id, id } }) => {
        return (
          <Box
            width="100%"
            p="5px"
            display="flex"
            justifyContent="left"
            gap={1}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="success"
              disabled={user_id ? true : false}
              onClick={() => handleSetUser(id)}
            >
              <PersonAddAltIcon color={colors.greenAccent[200]} />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {statusVet?.success && (
        <SuccessMessage
          message={
            statusVet?.message || "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {(errorListVet || !statusVet?.success) && (
        <ErrorMessage message={statusVet?.message} />
      )}
      {openVetForm && (
        <FormVet
          open={openVetForm}
          close={handleClose}
          data={dataVet}
          setRequestSend={setRequestSend}
        />
      )}
      <Box m="20px">
        <Header title="VÉTÉRINAIRES" subtitle="List des Vétérinaire" />
        <Box
          m="40px 0 0 0"
          height="65vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Button
            color="info"
            variant="outlined"
            onClick={() => handleClickOpen()}
          >
            <AddIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Ajouter Vétérinaire
            </Typography>
          </Button>
          <DataGrid
            loading={
              isLoadingListVet || isLoadingSetAsUser || isLoadingDeleteVet
            }
            rowCount={veterinaire?.meta?.total}
            rows={veterinaire?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              veterinaire?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Vets;
