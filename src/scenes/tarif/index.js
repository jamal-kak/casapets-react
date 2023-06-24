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
import { useTarifContext } from "../../hooks/tarifs/useTarifContext";
import { useListTarifs } from "../../hooks/tarifs/useListTarifs";
import { useDeleteTarif } from "../../hooks/tarifs/useDeleteTarif";

// Scenes
import FormTarif from "./FormTarif";

const Tarifs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { listTarifs, isLoadingListTarifs } = useListTarifs();
  const { deleteTarif, isLoadingDeleteTarif } = useDeleteTarif();
  const { tarifs, updatedTarif, newTarif, deletedTarif } = useTarifContext();
  const [requestSend, setRequestSend] = useState(false);
  const [statusTarif, setStatusTarif] = useState({});

  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [openTarifsForm, setOpenTarifsForm] = useState(false);
  const [dataTarifs, setDataTarifs] = useState({});

  const handleList = async () => {
    await listTarifs();
  };

  const handleClickOpen = (data = null) => {
    setDataTarifs(data);
    setOpenTarifsForm(true);
    setStatusTarif({});
  };

  const handleClose = () => {
    setOpenTarifsForm(false);
  };

  const handleDelete = async (id) => {
    await setStatusTarif({});
    await deleteTarif(id);
    setRequestSend((prev) => !prev);
  };

  useEffect(() => {
    handleList();
    setStatusTarif(newTarif || updatedTarif || deletedTarif);
  }, [requestSend]);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },

    {
      field: "reference",
      headerName: "Référence",
      width: 200,
    },
    {
      field: "prix_net",
      headerName: "Prix Net",
      width: 200,
      valueGetter: ({ row: { prix_net } }) => {
        // Format the price above to USD using the locale, style, and currency.
        let prix_mad = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "MAD",
        });
        return prix_mad.format(prix_net);
      },
    },
    {
      field: "title",
      headerName: "Service",
      width: 200,
      valueGetter: (params) => {
        return params.row.service.title;
      },
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 250,
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
      {statusTarif?.success && (
        <SuccessMessage
          message={
            statusTarif?.message ||
            "Vote Opération a été effectuée avec succès !"
          }
        />
      )}
      {!statusTarif?.success && <ErrorMessage message={statusTarif?.message} />}
      <Box m="20px">
        <Header title="TARIFS" subtitle="List des Tarifs" />
        {openTarifsForm && (
          <FormTarif
            open={openTarifsForm}
            close={handleClose}
            data={dataTarifs}
            setRequestSend={setRequestSend}
          />
        )}
        <Box
          m="40px 0 0 0"
          height="65vh"
          width="100%"
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
              Ajouter Tarif
            </Typography>
          </Button>

          <DataGrid
            loading={isLoadingDeleteTarif || isLoadingListTarifs}
            rowCount={tarifs?.meta?.total}
            rows={tarifs?.data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[
              tarifs?.data?.length === 0 ? 0 : paginationModel.pageSize,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Tarifs;
