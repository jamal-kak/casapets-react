// React Lib
import { useEffect, useState } from "react";

// Mui Lib
import { Box, Button, Avatar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Mui Theme
import { tokens } from "../../theme";

// Mui Icons
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

// Components
import { Header, SuccessMessage, ErrorMessage } from "../../components";

// Context
import { useDemandeAdoptionContext } from "../../hooks/demandeAdoption/useDemandeAdoptionContext";
import { useListDemandes } from "../../hooks/demandeAdoption/useListDemandes";
import { useDeleteDemande } from "../../hooks/demandeAdoption/useDeleteDemande";
import { useChangeStatus } from "../../hooks/demandeAdoption/useChangeStatus";

const DemandeAdoption = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = JSON.parse(localStorage.getItem("user"));

  const { demandes, deletedDemande, demandeStatus } =
    useDemandeAdoptionContext();
  const { listDemandes, isLoadingListDemandes } = useListDemandes();
  const { deleteDemande, isLoadingDeleteDemande } = useDeleteDemande();
  const { changeStatus, isLoadingChangeStatus } = useChangeStatus();

  const [requestSend, setRequestSend] = useState(false);
  const [statusAdoption, setStatusAdoption] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });

  const handleList = async () => {
    await listDemandes();
  };

  const handleChangeStatus = async (id, status) => {
    if (status === "valide") {
      await changeStatus(id, status);
    } else {
      await changeStatus(id, status);
    }
    setRequestSend((prev) => !prev);
  };

  const handleDelete = async (id) => {
    setStatusAdoption(null);
    await deleteDemande(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusAdoption(deletedDemande || demandeStatus);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "photo",
      headerName: "Photo",
      width: 90,
      renderCell: ({
        row: {
          adoption: { photo },
        },
      }) => {
        return <Avatar src={photo} />;
      },
    },

    {
      field: "name",
      headerName: "Nom du Pet",
      width: 120,
      valueGetter: (params) => {
        return params.row.adoption.name;
      },
    },
    {
      field: "type",
      headerName: "Type du Pet",
      width: 120,
      valueGetter: (params) => {
        return params.row.adoption.type;
      },
    },
    {
      field: "age",
      headerName: "Age du Pet",
      width: 120,
      valueGetter: (params) => {
        return params.row.adoption.age;
      },
    },
    {
      field: "prix",
      headerName: "Prix du Pet",
      width: 150,
      valueGetter: (params) => {
        return `${params.row.adoption.prix}.00 MAD`;
      },
    },
    {
      field: "adopteur",
      headerName: "Adopteur",
      width: 150,
      valueGetter: (params) => {
        return params.row.user.name;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            backgroundColor={
              status === "en cours"
                ? colors.blueAccent[400]
                : status === "valide"
                ? colors.greenAccent[700]
                : colors.redAccent[400]
            }
            p="5px 10px"
            borderRadius="5px"
            width={70}
            textAlign="center"
          >
            {status}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: ({ row, row: { id } }) => {
        return (
          <Box
            width="100%"
            p="5px"
            display="flex"
            justifyContent="start"
            gap={1}
          >
            {row.status === "en cours" && (
              <>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 28 }}
                  color="success"
                  width="10px"
                  onClick={() => handleChangeStatus(id, "valide")}
                  disabled={user?.role_id === 2 ? true : false}
                >
                  <b>Valider</b>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 28 }}
                  color="error"
                  width="10px"
                  onClick={() => handleChangeStatus(id, "refuse")}
                  disabled={user?.role_id === 2 ? true : false}
                >
                  <b>Refuser</b>
                </Button>
              </>
            )}
            {(row.status === "en cours" || row.status === "refuse") && (
              <Button
                variant="outlined"
                sx={{ borderRadius: 28 }}
                color="warning"
                onClick={() => {
                  handleDelete(id);
                }}
                disabled={user?.role_id === 2 ? true : false}
              >
                <DeleteIcon color={colors.redAccent[200]} />
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {statusAdoption?.success && (
        <SuccessMessage
          message={
            statusAdoption?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}

      {statusAdoption?.success === false && (
        <ErrorMessage message={statusAdoption?.message} />
      )}
      <Box m="20px">
        <Header
          title="DEMANDES D'ADOPTION"
          subtitle="List des demandes d'adoption"
        />
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
          <DataGrid
            loading={
              isLoadingListDemandes ||
              isLoadingDeleteDemande ||
              isLoadingChangeStatus
            }
            rowCount={demandes?.meta?.total}
            rows={demandes?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              demandes?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default DemandeAdoption;
