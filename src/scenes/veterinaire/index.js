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

  const handleList = async () => {
    await listVet();
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
    { field: "id", headerName: "ID", flex: 0.25 },

    {
      field: "reference",
      headerName: "Référence",
      flex: 0.5,
    },
    {
      field: "full_name",
      headerName: "Nom & Prénom",
      flex: 0.75,
    },
    {
      field: "adresse",
      headerName: "Adresse",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-MAIL",
      flex: 0.75,
    },
    {
      field: "phone",
      headerName: "TELEPHONE",
      flex: 0.5,
    },
    {
      field: "city",
      headerName: "VILLE",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      renderCell: ({ row: { id } }) => {
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
              onClick={() => navigate(`update-vet/${id}`)}
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
      flex: 0.5,
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
      {isLoadingListVet ||
      isLoadingSetAsUser ||
      isLoadingDeleteVet ||
      !veterinaire ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          {statusVet?.success && (
            <SuccessMessage
              message={
                statusVet?.message ||
                "Vote Opération a été effectuée avec succès !"
              }
            />
          )}
          {(errorListVet || !statusVet?.success) && (
            <ErrorMessage message={statusVet?.message} />
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
                onClick={() => navigate("add-vet")}
              >
                <AddIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  Ajouter Vétérinaire
                </Typography>
              </Button>
              <DataGrid
                rowCount={veterinaire?.meta?.total}
                rows={veterinaire?.data || []}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[
                  veterinaire?.data?.length === 0
                    ? 0
                    : paginationModel.pageSize,
                ]}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Vets;
