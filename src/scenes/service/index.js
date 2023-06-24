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
import EditIcon from "@mui/icons-material/Edit";

// Mui Theme
import { tokens } from "../../theme";

// Components
import { Header, ErrorMessage, SuccessMessage } from "../../components";

// Context
import { useServiceContext } from "../../hooks/services/useServiceContext";
import { useListServices } from "../../hooks/services/useListServices";
import { useDeleteService } from "../../hooks/services/useDeleteService";

// Scenes
import FormService from "./FormService";

const Services = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { listServices, isLoadingListServices } = useListServices();
  const { deleteService, isLoadingDeleteService } = useDeleteService();
  const { services, updatedService, newService, deletedService } =
    useServiceContext();
  const [requestSend, setRequestSend] = useState(false);
  const [statusService, setStatusService] = useState({});

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openServiceForm, setOpenServiceForm] = useState(false);
  const [dataService, setDataService] = useState({});

  const handleList = async () => {
    await listServices();
  };

  const handleClickOpen = (data = null) => {
    setStatusService({});
    setDataService(data);
    setOpenServiceForm(true);
  };

  const handleClose = () => {
    setOpenServiceForm(false);
  };

  const handleDelete = async (id) => {
    await setStatusService({});
    await deleteService(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusService(newService || updatedService || deletedService || {});
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },

    {
      field: "reference",
      headerName: "Référence",
      width: 200,
    },
    {
      field: "title",
      headerName: "Titre",
      width: 250,
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 400,
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
  ];

  return (
    <Box m="20px">
      {statusService?.success && (
        <SuccessMessage
          message={
            statusService?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {statusService?.success === false ? (
        <ErrorMessage message={statusService?.message} />
      ) : null}
      <Header title="SERVICES" subtitle="List des Services" />
      {openServiceForm && (
        <FormService
          open={openServiceForm}
          close={handleClose}
          data={dataService}
          setRequestSend={setRequestSend}
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
          onClick={() => handleClickOpen()}
        >
          <AddIcon />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Ajouter Service
          </Typography>
        </Button>
        <DataGrid
          loading={isLoadingListServices || isLoadingDeleteService}
          rowCount={services?.meta?.total}
          rows={services?.data || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[
            services?.data?.length === 0 ? 0 : paginationModel.pageSize,
          ]}
        />
      </Box>
    </Box>
  );
};

export default Services;
