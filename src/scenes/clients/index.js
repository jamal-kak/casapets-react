// React Lib
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui Lib
import {
  Box,
  Button,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

// Mui Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Components
import { Header, SuccessMessage, ErrorMessage } from "../../components";

// Context
import { useClientContext } from "../../hooks/clients/useClientContext";
import { useListClient } from "../../hooks/clients/useListClient";
import { useDeleteClient } from "../../hooks/clients/useDeleteClient";

// Scenes
import FormClient from "./FormClient";

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { client, newClient, updatedClient, deletedClient } =
    useClientContext();
  const { listClient, isLoading } = useListClient();
  const { deleteClient, isLoadingDeleteClient } = useDeleteClient();

  const [requestSend, setRequestSend] = useState(false);
  const [statusClient, setStatusClient] = useState({});

  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openClientForm, setOpenClientForm] = useState(false);
  const [dataClient, setDataClient] = useState({});

  const handleList = async () => {
    await listClient();
  };

  const handleClickOpen = (data = null) => {
    setDataClient(data);
    setOpenClientForm(true);
  };

  const handleClose = () => {
    setOpenClientForm(false);
  };

  const handleDelete = async (id) => {
    await deleteClient(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusClient(newClient || updatedClient || deletedClient);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "full_name",
      headerName: "Nom & Prénom",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Téléphone",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "adresse",
      headerName: "Adresse",
      width: 350,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
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
              color="success"
              onClick={() => handleClickOpen(row)}
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
      {statusClient?.success && (
        <SuccessMessage
          message={
            statusClient?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {!statusClient?.success && (
        <ErrorMessage message={statusClient?.message} />
      )}
      {openClientForm && (
        <FormClient
          open={openClientForm}
          close={handleClose}
          data={dataClient}
          setRequestSend={setRequestSend}
        />
      )}
      <Box m="20px">
        <Header title="CLIENTS" subtitle="List des clients" />
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
              Ajouter Client
            </Typography>
          </Button>
          <DataGrid
            loading={isLoading || isLoadingDeleteClient}
            rowCount={client?.meta?.total}
            rows={client?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              client?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Clients;
