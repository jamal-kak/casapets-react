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
import { useReservationContext } from "../../hooks/reservations/useReservationContext";
import { useListReservations } from "../../hooks/reservations/useListReservations";
import { useDeleteReservation } from "../../hooks/reservations/useDeleteReservation";
import { useClientContext } from "../../hooks/clients/useClientContext";
import { useVetContext } from "../../hooks/veterinaire/useVetContext";
import { usePetsContext } from "../../hooks/pets/usePetsContext";

// Scenes
import FormReservation from "./FormReservation";

// Helpers
import {map_Clients_veterinaires_pets_reservations} from "../../utils/Helpers";
import { useListPets } from "../../hooks/pets/useListPets";
import { useListVet } from "../../hooks/veterinaire/useListVet";
import { useListClient } from "../../hooks/clients/useListClient";
import { useListBoxs } from "../../hooks/boxs/useListBoxs";
import { useBoxContext } from "../../hooks/boxs/useBoxContext";
import { useListServices } from "../../hooks/services/useListServices";
import { useServiceContext } from "../../hooks/services/useServiceContext";



const Reservations = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const { listReservations, isLoadingListReservations } = useListReservations();
  const { deleteReservation, isLoadingDeleteReservation } = useDeleteReservation();
  const { reservations, updatedReservation, NewReservation, deletedReservation } = useReservationContext();
  const [statusReservation, setStatusReservation] = useState({});

  const { listClient, isLoading } = useListClient();
  const { client } = useClientContext();

  const { listPets, isLoadingListPets } = useListPets();
  const { pet } = usePetsContext();

  const { listVet, errorListVet, isLoadingListVet } = useListVet();
  const { veterinaire } = useVetContext();

  const { listBoxs, isLoadingListBoxs } = useListBoxs();
  const { boxs, updatedBox, NewBox, deletedBox } = useBoxContext();


  const { listServices, isLoadingListServices } = useListServices();
  const { services, updatedService, NewService, deletedService } = useServiceContext();


  // console.log("boxsboxsboxs",services);


  const mappedReservations = map_Clients_veterinaires_pets_reservations(reservations,client,pet,veterinaire) || [];


  const [requestSend, setRequestSend] = useState(false);

  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openReservationForm, setOpenReservationForm] = useState(false);
  const [dataReservation, setDataReservation] = useState({});

  const handleList = async () => {

    await listReservations();
    await listClient();
    await listPets();
    await listVet();
    await listBoxs();
    await listServices();

  };

  const handleClickOpen = (data = null) => {
    setDataReservation(data);
    setOpenReservationForm(true);
  };

  const handleClose = () => {
    setOpenReservationForm(false);
  };

  const handleDelete = async (id) => {
    await deleteReservation(id);
    setRequestSend((prev) => !prev);
  };

  const handleEdit = (row) => {
    // Logic to send the clicked row data to the form component
  };

  useEffect(() => {
    handleList();
    setStatusReservation(NewReservation || updatedReservation || deletedReservation);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "reference", headerName: "Référence", width: 100 },
    { field: "client_id", headerName: "Client ID", width: 50 },
    { field: "client_full_name", headerName: "Client name", width: 150 },
    { field: "pet_id", headerName: "Pet ID", width: 50 },
    { field: "pet_name", headerName: "Pet name", width: 150 },
    { field: "veterinaire_id", headerName: "Vétérinaire ID", width: 50 },
    { field: "vet_full_name", headerName: "Vétérinaire name", width: 200 },
    { field: "box_id", headerName: "Box ID", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 200,
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
    <>
      {statusReservation?.success && (
        <SuccessMessage
          message={
            statusReservation?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {!statusReservation?.success && (
        <ErrorMessage message={statusReservation?.message} />
      )}
      {openReservationForm && (
        <FormReservation
          open={openReservationForm}
          close={handleClose}
          data={dataReservation}
          setRequestSend={setRequestSend}
          client={client}
          pet={pet}
          veterinaire={veterinaire}
          boxs={boxs}
          services={services}
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
            loading={ isLoadingListReservations || isLoadingDeleteReservation || isLoading || isLoadingListPets || isLoadingListVet || isLoadingListBoxs || isLoadingListServices
            }
            rowCount={reservations?.meta?.total}
            rows={ mappedReservations?mappedReservations:[]}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              mappedReservations?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Reservations;
