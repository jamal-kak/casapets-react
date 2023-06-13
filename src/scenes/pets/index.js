// React Lib
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui Lib
import {
  Box,
  Button,
  Typography,
  Avatar,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Mui Theme
import { tokens } from "../../theme";

// Mui Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import LensIcon from "@mui/icons-material/Lens";

// Components
import { Header, SuccessMessage, ErrorMessage } from "../../components";

// Context
import { usePetsContext } from "../../hooks/pets/usePetsContext";
import { useListPets } from "../../hooks/pets/useListPets";
import { useDeletePet } from "../../hooks/pets/useDeletePet";

// Scenes
import InfoPet from "./InfoPet";

const Pets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { pet, newPet, updatedPet, deletedPet } = usePetsContext();
  const { listPets, isLoadingListPets } = useListPets();
  const { deletePet, isLoadingDeletePet } = useDeletePet();

  const [requestSend, setRequestSend] = useState(false);
  const [statusPet, setStatusPet] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openPetInfo, setOpenPetInfo] = useState(false);
  const [petDetail, setPetDetail] = useState({});

  const navigate = useNavigate();

  const handleClickOpen = (data) => {
    setPetDetail(data);
    setOpenPetInfo(true);
  };

  const handleClose = () => {
    setPetDetail(null);
    setOpenPetInfo(false);
  };

  const handleList = async () => {
    await listPets();
  };

  const handleDelete = async (id) => {
    await deletePet(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusPet(newPet || updatedPet || deletedPet);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "photo",
      headerName: "Photo",
      flex: 0.5,
      renderCell: ({ row: { photo } }) => {
        return <Avatar src={photo} />;
      },
    },

    {
      field: "name",
      headerName: "Nom",
      flex: 0.5,
    },
    {
      field: "date_de_naissance",
      headerName: "Date Naissance",
      flex: 0.75,
    },
    {
      field: "vaccine",
      headerName: "Vaccine",
      flex: 0.5,
      renderCell: ({ row: { vaccine } }) => {
        return <LensIcon color={vaccine === "Oui" ? "success" : "error"} />;
      },
    },
    {
      field: "sexe",
      headerName: "Sexe",
      flex: 0.5,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "race",
      headerName: "Race",
      flex: 0.75,
      valueGetter: (params) => {
        return params.row.race.name;
      },
    },
    {
      field: "client",
      headerName: "Propriétaire",
      flex: 0.75,
      valueGetter: (params) => {
        return params.row.client.full_name;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      renderCell: ({ row, row: { id } }) => {
        return (
          <Box
            width="100%"
            p="5px"
            display="flex"
            justifyContent="center"
            gap={1}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="info"
              width="10px"
              onClick={() => handleClickOpen(row)}
            >
              <VisibilityIcon color={colors.blueAccent[100]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="success"
              width="10px"
              onClick={() => navigate(`update-pet/${id}`)}
            >
              <EditIcon color={colors.greenAccent[200]} />
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="warning"
              onClick={() => {
                handleDelete(id);
              }}
            >
              <DeleteIcon color={colors.redAccent[200]} />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {isLoadingListPets || isLoadingDeletePet || !pet ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          {statusPet?.success && (
            <SuccessMessage
              message={
                statusPet?.message ||
                "Vote Opération a été effectuée avec succès !"
              }
            />
          )}

          {(!statusPet?.success || pet?.message) && (
            <ErrorMessage message={statusPet?.message || pet?.message} />
          )}
          <Box m="20px">
            <Header title="PETS" subtitle="List des pets" />
            {openPetInfo && (
              <InfoPet
                open={openPetInfo}
                close={handleClose}
                data={petDetail}
              />
            )}
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
                onClick={() => navigate("add-pet")}
              >
                <AddIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  Ajouter Pet
                </Typography>
              </Button>
              <DataGrid
                rowCount={pet?.meta?.total}
                rows={pet?.data || []}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[
                  pet?.data?.length === 0 ? 0 : paginationModel.pageSize,
                ]}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Pets;
