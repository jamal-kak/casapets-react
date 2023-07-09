// React Lib
import { useEffect, useState } from "react";

// Mui Library
import { Box, Button, Typography, useTheme } from "@mui/material";
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
import { useReservationContext } from "../../hooks/reservations/useReservationContext";
import { useListReservations } from "../../hooks/reservations/useListReservations";
import { useDeleteReservation } from "../../hooks/reservations/useDeleteReservation";
import { useChangeStatus } from "../../hooks/reservations/useChangeStatus";

// Scenes
import FormReservation from "./FormReservation";

const Reservations = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const { user } = JSON.parse(localStorage.getItem("user"));

  const { listReservations, isLoadingListReservations } = useListReservations();
  const { deleteReservation, isLoadingDeleteReservation } =
    useDeleteReservation();
  const { changeStatus, isLoadingChangeStatus } = useChangeStatus();
  const {
    reservations,
    updatedReservation,
    newReservation,
    deletedReservation,
    statusRes,
  } = useReservationContext();
  const [statusReservation, setStatusReservation] = useState(null);

  const [requestSend, setRequestSend] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openReservationForm, setOpenReservationForm] = useState(false);
  const [dataReservation, setDataReservation] = useState({});

  const handleList = async () => {
    await listReservations();
  };

  const handleClickOpen = (data = null) => {
    setStatusReservation(null);
    setDataReservation(data);
    setOpenReservationForm(true);
  };

  const handleClose = () => {
    setOpenReservationForm(false);
  };

  const handleDelete = async (id) => {
    setStatusReservation(null);
    await deleteReservation(id);
    setRequestSend((prev) => !prev);
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus =
      status === "Devis"
        ? "confirme"
        : status === "Confirmé"
        ? "termine"
        : status === "termine"
        ? "facture"
        : "annule";
    setStatusReservation(null);
    await changeStatus(id, newStatus);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusReservation(
      newReservation || updatedReservation || deletedReservation || statusRes
    );
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "reference", headerName: "Référence", width: 100 },
    {
      field: "client_full_name",
      headerName: "Nom Client",
      width: 180,
      valueGetter: (params) => {
        return params.row.client.full_name;
      },
    },
    {
      field: "pet_name",
      headerName: "Nom Pet",
      width: 150,
      valueGetter: (params) => {
        return params.row.pet.name;
      },
    },
    {
      field: "box_libelle",
      headerName: "Box",
      width: 150,
      valueGetter: (params) => {
        return params.row.box.libelle;
      },
    },
    {
      field: "vet_full_name",
      headerName: "Vétérinaire name",
      width: 200,
      valueGetter: (params) => {
        return params.row.veterinaire.full_name;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            backgroundColor={
              status === "Devis"
                ? colors.grey[400]
                : status === "Confirmé"
                ? colors.blueAccent[400]
                : status === "termine"
                ? colors.primary[700]
                : status === "Facturé"
                ? colors.greenAccent[700]
                : colors.redAccent[400]
            }
            p="5px 10px"
            borderRadius="5px"
          >
            {status}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 350,
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
              disabled={
                (row.status === "Devis" ||
                  row.status === "Confirmé" ||
                  row.status === "Annulé") &&
                user?.role_id !== 2
                  ? false
                  : true
              }
            >
              <EditIcon color={colors.greenAccent[200]} />
            </Button>

            <Button
              variant="outlined"
              sx={{ borderRadius: 28 }}
              color="warning"
              onClick={() => handleDelete(id)}
              disabled={
                row.status === "Facturé" || user?.role_id === 2 ? true : false
              }
            >
              <DeleteIcon color={colors.redAccent[200]} />
            </Button>
            {row.status !== "Facturé" && row.status !== "Annulé" && (
              <Button
                variant="outlined"
                sx={{ borderRadius: 28 }}
                color="info"
                onClick={() => handleChangeStatus(id, row.status)}
              >
                {row.status === "Devis"
                  ? "Confirmé"
                  : row.status === "Confirmé"
                  ? "Terminé"
                  : row.status === "termine"
                  ? "Facturé"
                  : ""}
              </Button>
            )}

            {(row.status === "Devis" || row.status === "Confirmé") && (
              <Button
                variant="outlined"
                sx={{ borderRadius: 28 }}
                color="error"
                onClick={() => handleChangeStatus(id, "Annulé")}
              >
                Annuler
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {statusReservation?.success && (
        <SuccessMessage
          message={
            statusReservation?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {statusReservation?.success === false && (
        <ErrorMessage message={statusReservation?.message} />
      )}
      {openReservationForm && (
        <FormReservation
          open={openReservationForm}
          close={handleClose}
          data={dataReservation}
          setRequestSend={setRequestSend}
        />
      )}
      <Box m="20px">
        <Header title="RESERVATIONS" subtitle="List des Reservations" />
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
              Ajouter Reservation
            </Typography>
          </Button>
          <DataGrid
            loading={
              isLoadingListReservations ||
              isLoadingDeleteReservation ||
              isLoadingChangeStatus
            }
            rowCount={reservations?.meta?.total}
            rows={reservations?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              reservations?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Reservations;
